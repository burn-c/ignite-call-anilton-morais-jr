import React from 'react'
import {
  CalendarStepContainer,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerList,
  TimePickerListItem,
} from './styles'
import Calendar from '@/components/Calendar'

const CalendarStep: React.FC = () => {
  const isDateSelected = false
  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar />
      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader>
            segunda-feira <span>01 de julho</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerListItem>08:00h</TimePickerListItem>
            <TimePickerListItem>09:00h</TimePickerListItem>
            <TimePickerListItem>10:00h</TimePickerListItem>
            <TimePickerListItem>11:00h</TimePickerListItem>
            <TimePickerListItem>12:00h</TimePickerListItem>
            <TimePickerListItem>13:00h</TimePickerListItem>
            <TimePickerListItem>14:00h</TimePickerListItem>
            <TimePickerListItem>15:00h</TimePickerListItem>
            <TimePickerListItem>16:00h</TimePickerListItem>
            <TimePickerListItem>17:00h</TimePickerListItem>
          </TimePickerList>
        </TimePickerContainer>
      )}
    </CalendarStepContainer>
  )
}

export default CalendarStep
