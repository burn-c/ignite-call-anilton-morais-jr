import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function hendle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not provided' })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const availabelWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availabelWeekDays.some(
      (availabelWeekDay) => availabelWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT 
      EXTRACT(DAY FROM s.date) as date, 
      COUNT(s.date) as amount,
      ((uti.time_end_in_minutes - uti.time_start_in_minutes) / 60) as size
    FROM schedulings s
    LEFT JOIN user_time_intervals uti ON uti.week_day = EXTRACT(DOW FROM S.date + INTERVAL '1 day')
    WHERE s.user_id = ${user.id}
    AND EXTRACT(YEAR FROM S.date) = ${year}::int
    AND EXTRACT(MONTH FROM S.date) = ${month}::int
    GROUP BY EXTRACT(DAY FROM s.date),
      ((uti.time_end_in_minutes - uti.time_start_in_minutes) / 60)
    HAVING COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)
  `

  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return res.json({ blockedWeekDays, blockedDates })
}
