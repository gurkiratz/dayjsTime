/* eslint-disable react/prop-types */
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useState, useEffect } from 'react'
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(tz)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(isTomorrow)
dayjs.extend(customParseFormat)

export default function City({ city, curCity }) {
  const [time, setTime] = useState(dayjs().tz(city).format('h:mm'))
  const [ampm, setAmpm] = useState(dayjs().tz(city).format('A'))
  const [diff, setDiff] = useState()
  const [day, setDay] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().tz(city).format('h:mm'))
      setAmpm(dayjs().tz(city).format('A'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timezone1 = curCity
    const date1 = dayjs(dayjs().tz(timezone1).format('YYYY-MM-DD HH:mm:ss'))

    const timezone2 = city
    const date2 = dayjs(dayjs().tz(timezone2).format('YYYY-MM-DD HH:mm:ss'))
    let day
    if (date2.isToday()) {
      day = 'Today'
    } else if (date2.isYesterday()) {
      day = 'Yesterday'
    } else if (date2.isTomorrow()) {
      day = 'Tomorrow'
    }
    setDay(day)

    const minutesDiff = date2.diff(date1, 'm')
    let hours = Math.trunc(minutesDiff / 60)
    let remainingMinutes = Math.abs(minutesDiff % 60)
    let finalDiff = `${hours}:${remainingMinutes}`
    finalDiff = minutesDiff === 0 ? '0HRS' : finalDiff
    finalDiff = hours >= 0 ? `+${finalDiff}` : finalDiff
    setDiff(finalDiff)
  }, [])

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-sm">
          {day}, {diff}
        </span>
        <p className="font-medium">{city.split('/')[1]}</p>
      </div>
      <p className="text-3xl">
        {time} <span className="text-sm">{ampm}</span>
      </p>
    </div>
  )
}

// Duplicate cities
// design
