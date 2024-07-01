import React from 'react'
import { CalendarStepContainer } from './styles'
import Calendar from '@/components/Calendar'

// import { Container } from './styles';

const CalendarStep: React.FC = () => {
  return (
    <CalendarStepContainer>
      <Calendar />
    </CalendarStepContainer>
  )
}

export default CalendarStep
