import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import { useState } from 'react'
import City from './components/City'
import CityModal from './components/Modal'
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(tz)

const curCity = dayjs.tz.guess()
const data = [curCity]

function App() {
  const [modal, showModal] = useState(false)
  const [cities, setCities] = useState(data)

  const addCity = (city) => {
    setCities((prev) => [...prev, city])
  }

  const renderedCities = cities.map((city, i) => {
    return <City key={i} city={city} curCity={curCity} />
  })

  return (
    <section className="flex justify-center h-screen">
      <div className="w-[400px] bg-blue-200 text-xl px-3 py-3">
        <div className="flex justify-between">
          <span className="text-sm underline cursor-pointer">Edit</span>
          <button onClick={() => showModal(true)}>+</button>
        </div>
        <div className="mb-4">
          <p className="font-extrabold text-2xl">World Clock</p>
        </div>
        <div className="space-y-4 divide-y divide-black">{renderedCities}</div>
      </div>
      <CityModal showModal={showModal} modal={modal} addCity={addCity} />
    </section>
  )
}

export default App
