import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

function UserPage() {
  const [parts, setParts] = useState([])
  const [selectedParts, setSelectedParts] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/parts") // Cambia el puerto si es distinto
      .then(res => res.json())
      .then(data => setParts(data))
      .catch(err => console.error("Error getting parts:", err))
  }, [])

  const handlePartToggle = (partId) => {
    setSelectedParts(prev =>
      prev.includes(partId)
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    )
  }

  return (
    <>
    <Navbar />
    <section>
      <h1>Configuración del evento</h1>
      <ul className="parts-list"> 
        {parts.map(part => (
          <li key={part._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedParts.includes(part._id)}
                onChange={() => handlePartToggle(part._id)}
              />
              {part.name}
            </label>
          </li>
        ))}
      </ul>

      {selectedParts.length > 0 && (
        <div>
          {selectedParts.map(partId => {
            const part = parts.find(p => p._id === partId)
            return (
              <div key={partId}>
                <h2>{part ? `${part.name}:` : " "}</h2>
                {/* Aquí luego mostramos los productos de esta parte */}
              </div>
            )
          })}
        </div>
      )}
    </section>
    </>
  );
}

export default UserPage