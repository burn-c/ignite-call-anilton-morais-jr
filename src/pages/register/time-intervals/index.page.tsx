import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import React from 'react'
import { RegisterContainer, RegisterHeader } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'
import { ArrowRight } from 'phosphor-react'

const TimeIntervals: React.FC = () => {
  return (
    <RegisterContainer>
      <RegisterHeader>
        <Heading as={'strong'}>Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana
        </Text>
        <MultiStep size={4} currentStep={3} />
      </RegisterHeader>
      <IntervalBox as="form">
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput
                size="sm"
                type="time"
                step={60}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <TextInput
                size="sm"
                type="time"
                step={60}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </IntervalInputs>
          </IntervalItem>
          <IntervalItem></IntervalItem>
          <IntervalItem></IntervalItem>
          <IntervalItem></IntervalItem>
          <IntervalItem></IntervalItem>
          <IntervalItem></IntervalItem>
          <IntervalItem></IntervalItem>
        </IntervalsContainer>
        <Button>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </RegisterContainer>
  )
}

export default TimeIntervals
