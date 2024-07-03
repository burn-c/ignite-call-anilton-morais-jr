import React, { useState } from 'react'
import {
  CalendarStepContainer,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerList,
  TimePickerListItem,
} from './styles'
import Calendar from '@/components/Calendar'
import dayjs from 'dayjs'

const CalendarStep: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const fullDayAndMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null
  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader>
            {weekDay} <span>{fullDayAndMonth}</span>
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
