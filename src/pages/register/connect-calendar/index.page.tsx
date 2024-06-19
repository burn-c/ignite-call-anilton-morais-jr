import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import React from 'react'
import { RegisterContainer, RegisterHeader } from '../styles'
import { ArrowRight } from 'phosphor-react'
import { ConnectBox, ConnectItem } from './styles'

const ConnectCalendar: React.FC = () => {
  return (
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
          <Button variant={'secondary'}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}

export default ConnectCalendar
