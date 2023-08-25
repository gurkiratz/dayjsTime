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
  const [editMode, setEditMode] = useState(false)

  const addCity = (city) => {
    setCities((prev) => [...prev, city])
  }

  const handleDeleteCity = (deletedCity) => {
    const updatedCities = cities.filter((city) => city !== deletedCity)
    setCities(updatedCities)
  }

  const renderedCities = cities.map((city, i) => {
    return (
      <City
        key={i}
        city={city}
        curCity={curCity}
        editMode={editMode}
        onDelete={handleDeleteCity}
      />
    )
  })

  const toggleEdit = () => {
    setEditMode(!editMode)
    console.log(editMode)
  }

  return (
    <section className="flex justify-center h-screen">
      <div className="w-[400px] bg-zinc-900 text-gray-200 text-xl px-3 py-3">
        <div className="flex justify-between">
          <span
            className="text-sm underline cursor-pointer text-orange-400"
            onClick={toggleEdit}
          >
            {editMode ? 'Done' : 'Edit'}
          </span>
          <button
            onClick={() => {
              showModal(true)
              setEditMode(false)
            }}
            className="text-orange-400"
          >
            +
          </button>
        </div>
        <div className="mb-4">
          <p className="font-extrabold text-2xl">World Clock</p>
        </div>
        <div className="space-y-4 divide-y divide-gray-400">
          {renderedCities}
        </div>
        <p className="absolute left-0 right-0 text-center  bottom-0 text-sm text-zinc-400">
          made with ♥️ by{' '}
          <a
            href="https://github.com/gurkiratz"
            className="cursor-pointer underline"
            target="_blank"
          >
            gurkirat
          </a>
        </p>
      </div>
      <CityModal showModal={showModal} modal={modal} addCity={addCity} />
    </section>
  )
}

export default App
