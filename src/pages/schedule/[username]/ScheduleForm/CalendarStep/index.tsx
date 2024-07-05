import Calendar from '@/components/Calendar'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
  CalendarStepContainer,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerList,
  TimePickerListItem,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

const CalendarStep: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // const [availability, setAvailability] = useState<Availability | null>(null)
  const isDateSelected = !!selectedDate

  const router = useRouter()

  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const fullDayAndMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availabitiy', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader>
            {weekDay} <span>{fullDayAndMonth}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerListItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}::00h
                </TimePickerListItem>
              )
            })}
          </TimePickerList>
        </TimePickerContainer>
      )}
    </CalendarStepContainer>
  )
}

export default CalendarStep
