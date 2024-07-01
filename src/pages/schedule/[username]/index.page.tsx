import React from 'react'
import { ScheduleContainer, UserHeader } from './styles'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import ScheduleForm from './ScheduleForm'

// import { Container } from './styles';

interface ScheduleProps {
  user: {
    name: string
    avatarUrl: string
    bio: string
  }
}

const Schedule: React.FC<ScheduleProps> = ({
  user: { name, bio, avatarUrl },
}) => {
  return (
    <ScheduleContainer>
      <UserHeader>
        <Avatar src={avatarUrl} />
        <Heading>{name}</Heading>
        <Text>{bio}</Text>
      </UserHeader>
      <ScheduleForm />
    </ScheduleContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}

export default Schedule
