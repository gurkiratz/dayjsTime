// import './App.css'
import Modal from 'react-modal'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import { useState, useEffect } from 'react'
import { FaEdit, FaWindowClose } from 'react-icons/fa'

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(tz)

Modal.setAppElement('#root')

function App() {
  const [timezone, setTimezone] = useState(dayjs.tz.guess())
  const [myTz, setMyTz] = useState(dayjs.tz.guess())
  const [time, setTime] = useState(dayjs().tz(timezone).format('HH:mm:ss'))
  const [date, setDate] = useState(
    dayjs().tz(timezone).format('dddd, D MMM, YYYY')
  )
  const [modal, showModal] = useState(false)
  const timezones = Intl.supportedValuesOf('timeZone')

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().tz(timezone).format('HH:mm:ss'))
    }, 1000)
    return () => clearInterval(interval)
  }, [timezone])

  useEffect(() => {
    document.title = timezone
  }, [timezone])

  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
    },
    content: {
      backgroundColor: 'black',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  const handleTimezoneChange = (e) => {
    const selectedTimezone = e.target.value

    setMyTz(selectedTimezone)
  }

  const handleApply = () => {
    const currentTime = dayjs().tz(timezone).format('HH:mm:ss')
    const currentDate = dayjs().tz(timezone).format('dddd, D MMM, YYYY')
    setTime(currentTime)
    setDate(currentDate)
    setTimezone(myTz)
    setMyTz(myTz)
    showModal(false)
  }

  const openModal = () => {
    showModal(true)
  }

  const closeModal = () => {
    showModal(false)
    setMyTz(timezone)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="-translate-x-2 px-4 text-right">
        <p className="tracking-widest inline-block opacity-[0.6] text-right">
          {timezone}
        </p>
        <button
          onClick={openModal}
          className="bg-transparent text-white inline-block opacity-[0.6] p-2 ml-2"
        >
          <FaEdit />
        </button>

        <p className="flex justify-center my-4 -mr-2">
          <span
            style={{ fontFamily: 'Courier Prime' }}
            className="text-6xl md:text-9xl font-bold text-center"
          >
            {time}
          </span>
        </p>
        <p>{date}</p>

        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Timezone Modal"
        >
          <h2 className="opacity-60">Change Timezone</h2>
          <select
            onChange={handleTimezoneChange}
            value={myTz}
            className="px-4 py-2 bg-transparent w-40 rounded-md mr-3 hover:border hover:border-[#646cff] focus:border-[#646cff]"
          >
            {timezones.map((tz) => (
              <option
                key={tz}
                value={tz}
                style={{
                  backgroundColor: '#222',
                  color: '#fff',
                }}
              >
                {tz}
              </option>
            ))}
            ``
          </select>
          <button className="bg-transparent" onClick={handleApply}>
            Apply
          </button>
          <FaWindowClose
            className="bg-transparent p-0 cursor-pointer fixed top-6 right-6"
            onClick={closeModal}
          />
        </Modal>
      </div>
    </div>
  )
}

export default App
