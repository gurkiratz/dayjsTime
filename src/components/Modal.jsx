import { useState } from 'react'
import Modal from 'react-modal'
import SearchBar from './SearchBar'

Modal.setAppElement('#root')

const CityList = ({ showModal, modal, addCity }) => {
  const customStyles = {
    overlay: {
      paddingTop: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
    },
    content: {
      width: '400px',
      height: '80vh',
      backgroundColor: '#111',
      color: 'white',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  const closeModal = () => {
    showModal(false)
  }

  const handleClick = (tz) => {
    addCity(tz)
    setFiltered(timezones)
    closeModal()
  }
  const timezones = Intl.supportedValuesOf('timeZone')
  const [filtered, setFiltered] = useState(timezones)
  return (
    <Modal
      isOpen={modal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Timezone Modal"
    >
      <h2 className="text-center mb-2 text-sm">Choose a City</h2>

      <div className="flex gap-2 mb-2">
        <SearchBar setFiltered={setFiltered} timezones={timezones} />
        <span onClick={closeModal} className="text-orange-500 cursor-pointer">
          Cancel
        </span>
      </div>
      <div className="divide-y divide-zinc-900 overflow-y-auto">
        {filtered.map((tz) => (
          <p
            onClick={() => handleClick(tz)}
            key={tz}
            className="py-2 text-white"
          >
            {tz}
          </p>
        ))}
      </div>
    </Modal>
  )
}

export default CityList
