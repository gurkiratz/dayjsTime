import './App.css'
import Modal from 'react-modal'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import { useState, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'

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
    <div style={{ textAlign: 'right' }}>
      <p
        style={{
          letterSpacing: '2px',
          display: 'inline-block',
          opacity: '0.6',
        }}
      >
        {timezone}
      </p>
      <button
        onClick={openModal}
        style={{
          background: 'transparent',
          color: '#fff',
          display: 'inline-block',
          opacity: '0.6',
        }}
      >
        <FaEdit />
      </button>

      <h1 style={{ fontSize: '7rem', padding: '0px' }}>{time}</h1>
      <p>{date}</p>

      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Timezone Modal"
      >
        <h2>Change Timezone</h2>
        <select
          onChange={handleTimezoneChange}
          value={myTz}
          style={{
            padding: '8px',
            background: 'transparent',
            borderRadius: '6px',
            marginRight: '10px',
          }}
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
        <button
          style={{
            background: 'transparent',
          }}
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          style={{
            background: 'transparent',
          }}
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  )
}

export default App
