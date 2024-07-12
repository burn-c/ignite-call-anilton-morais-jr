import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import React from 'react'
import { RegisterContainer, RegisterHeader } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const ConnectCalendar: React.FC = () => {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignIn = session.status === 'authenticated'

  async function handleSignIn() {
    await signIn('google')
  }

  async function handleNavigateToNextPage() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conect sua agenda do Google | Ignite Call" noindex />
      <RegisterContainer>
        <RegisterHeader>
          <Heading as={'strong'}>Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </RegisterHeader>
        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignIn ? (
              <Button disabled>
                Conectado <Check />
              </Button>
            ) : (
              <Button variant={'secondary'} onClick={handleSignIn}>
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size={'sm'}>
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar
            </AuthError>
          )}
          <Button disabled={!isSignIn} onClick={handleNavigateToNextPage}>
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </RegisterContainer>
    </>
  )
}

export default ConnectCalendar
