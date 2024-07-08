import React, { useMemo, useState } from 'react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '@/utils/get-week-days'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

// import { Container } from './styles';

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelected,
}) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const router = useRouter()

  const username = String(router.query.username)

  const { data: blockedDates } = useQuery<BlockedDates>({
    queryKey: [
      'blocked-dates',
      currentDate.get('year'),
      String(currentDate.get('month') + 1).padStart(2, '0'),
    ],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: String(currentDate.get('month') + 1).padStart(2, '0'),
        },
      })

      return response.data
    },
  })

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const daysInMonth = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastWeekDay = currentDate.endOf('month').get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1), // Get the last days to complete the week
    }).map((_, i) => {
      return currentDate.endOf('month').add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({ date, disabled: true })),
      ...daysInMonth.map((date) => ({
        date,
        disabled:
          date.endOf('day').isBefore(new Date()) ||
          blockedDates.blockedWeekDays.includes(date.get('day')) ||
          blockedDates.blockedDates.includes(date.get('date')),
      })),
      ...nextMonthFillArray.map((date) => ({ date, disabled: true })),
    ]

    // Separate in week
    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0 // Check if is forming a new week
        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.date()}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}

export default Calendar
