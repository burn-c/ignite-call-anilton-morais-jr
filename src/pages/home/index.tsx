import { Heading, Text } from '@ignite-ui/react'
import { Hero, HomeContainer, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import Image from 'next/image'
import ClaimUsernameForm from './components/ClaimUsernameForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const session = useSession()
  const router = useRouter()

  const isSignIn = session.status === 'authenticated'

  if (isSignIn) {
    router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <HomeContainer>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </Preview>
    </HomeContainer>
  )
}

export default Home
