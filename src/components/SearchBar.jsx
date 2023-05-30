import { useState } from 'react'

const SearchBar = ({ timezones, setFiltered }) => {
  const [term, setTerm] = useState('')

  const handleChange = (event) => {
    const term = event.target.value
    setTerm(term)

    if (term === '') {
      setFiltered(timezones)
    } else {
      const filtered = timezones.filter((city) =>
        city.toLowerCase().includes(term.toLowerCase())
      )
      setFiltered(filtered)
    }
  }

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search"
        value={term}
        onChange={(event) => handleChange(event)}
        className="bg-zinc-900 rounded-xl indent-2 focus:outline-none text-sm py-1 w-full "
      />
    </div>
  )
}

export default SearchBar
