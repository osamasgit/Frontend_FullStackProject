import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

function UserPage() {
  const [parts, setParts] = useState([])
  const [selectedParts, setSelectedParts] = useState([])
  const [searchInputs, setSearchInputs] = useState({})
  const [searchResults, setSearchResults] = useState({})
  const [selectedProducts, setSelectedProducts] = useState({})
  const [totalMaterials, setTotalMaterials] = useState([])
  const [totalGuests, setTotalGuests] = useState(0)

  useEffect(() => {
    fetch("http://localhost:8080/api/parts")
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

  const handleSearchChange = (partId, query) => {
    // Guardamos el input
    setSearchInputs(prev => ({ ...prev, [partId]: query }))

    // Hacemos fetch si hay texto
    if (query.length > 1) {
      fetch(`http://localhost:8080/api/products/search?query=${query}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(prev => ({ ...prev, [partId]: data }))
        })
        .catch(err => console.error("Error searching products:", err))
    } else {
      setSearchResults(prev => ({ ...prev, [partId]: [] }))
    }
  }

  const handleAddProductToPart = async (partId, productId) => {
  try {
    const res = await fetch(`http://localhost:8080/api/products/${productId}`)
    const product = await res.json()

    // Añadir el producto al array de productos de esa parte
    setSelectedProducts(prev => {
      const updated = { ...prev }
      if (!updated[partId]) updated[partId] = []

      const alreadyExists = updated[partId].some(p => p._id === product._id)
      if (!alreadyExists) {
        updated[partId].push(product)
      }
      return updated
    })

    addMaterials(product.materials || [])

    } catch (error) {
      console.error("Error añadiendo producto a la parte:", error)
    }
  }

  const addMaterials = (newMaterials) => {
    setTotalMaterials(prev => {
      const map = {}

      prev.forEach(m => {
        const id = m.material?._id || m.material
        if (map[id]) {
          map[id].quantity += m.quantity
        } else {
          map[id] = { ...m }
        }
      })

      newMaterials.forEach(m => {
        const id = m.material?._id || m.material
        if (map[id]) {
          map[id].quantity += m.quantity
        } else {
          map[id] = { ...m }
        }
      })

    return Object.values(map)
    })
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
          <label>
            Número total de invitados:
            <input 
              type="number" 
              min="0" 
              value={totalGuests} 
              onChange={e => setTotalGuests(Number(e.target.value))} 
            />
          </label>
        </ul>

        {selectedParts.map(partId => {
          const part = parts.find(p => p._id === partId)
          return (
            <div key={partId}>
              <h2>{part.name}:</h2>

              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchInputs[partId] || ""}
                onChange={e => handleSearchChange(partId, e.target.value)}
              />

              <ul>
                {(searchResults[partId] || []).map(product => (
                  <li key={product._id}>
                    {product.name}
                    <button onClick={() => handleAddProductToPart(partId, product._id)}>Añadir</button>
                  </li>
                ))}
              </ul>
              
              <h3>Productos añadidos:</h3>
              <ul>
                {(selectedProducts[partId] || []).map(prod => (
                  <li key={prod._id}>{prod.name}</li>
                ))}
              </ul>         
            </div>
          )
        })}
      </section>
      <section>
        <h2>Materiales totales:</h2>
        <ul>
          {totalMaterials.map((mat, idx) => (
            <li key={idx}>
              {mat.material?.name || "Nombre desconocido"} ({mat.quantity})
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default UserPage