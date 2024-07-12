import { google } from 'googleapis'
import { prisma } from './prisma'
import dayjs from 'dayjs'

export async function getGoogleOauthToken(userId: string) {
  /** Get account from user */
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      user_id: userId,
    },
  })

  /** Initialize auth variable with google clientId and Secret */
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )

  /** Set authentication credentials   */
  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  })

  // Check if token has a expiration date
  if (!account.expires_at) {
    return auth
  }

  // Check if token has expired
  const isTokenExperid = dayjs(account?.expires_at * 1000).isBefore(new Date())

  // If token has expired, use the refresh token to update the access token
  if (isTokenExperid) {
    const { credentials } = await auth.refreshAccessToken()
    const {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = credentials

    // Update the user's account with new credential's data
    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
        id_token,
        refresh_token,
        scope,
        token_type,
      },
    })

    /** Set authentication credentials   */
    auth.setCredentials({
      access_token,
      expiry_date,
      refresh_token,
    })
  }

  return auth
}
