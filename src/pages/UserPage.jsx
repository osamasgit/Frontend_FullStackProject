import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { exportMaterialsToPDF } from "../components/ExportToPDF"

function UserPage() {
  const [parts, setParts] = useState([])
  const [selectedParts, setSelectedParts] = useState([])
  const [searchInputs, setSearchInputs] = useState({})
  const [searchResults, setSearchResults] = useState({})
  const [selectedProducts, setSelectedProducts] = useState({})
  const [totalMaterials, setTotalMaterials] = useState([])
  const [totalGuests, setTotalGuests] = useState('')

  useEffect(() => {
    fetch("https://backend-fullsatckproject.onrender.com/api/parts")
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
    setSearchInputs(prev => ({ ...prev, [partId]: query }))

    if (query.length > 1) {
      fetch(`https://backend-fullsatckproject.onrender.com/api/products/search?query=${query}`)
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
      const res = await fetch(`https://backend-fullsatckproject.onrender.com/api/products/${productId}`)
      const product = await res.json()

      setSelectedProducts(prev => {
        const updated = { ...prev }
        if (!updated[partId]) updated[partId] = []

        const alreadyExists = updated[partId].some(p => p._id === product._id)
        if (!alreadyExists) {
          updated[partId].push(product)
        }
        return updated
      })
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const handleCalculateMaterials = async () => {
    const allSelectedProducts = Object.values(selectedProducts)
      .flat()
      .map(p => ({ productId: p._id, unitsPerGuest: p.unitsPerGuest }))

    try {
      const res = await fetch("https://backend-fullsatckproject.onrender.com/api/materials/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guests: totalGuests, products: allSelectedProducts })
      })

      const materials = await res.json()
      setTotalMaterials(materials)
    } catch (error) {
      console.error("Error calculating materials:", error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <section>
          <h1>Partes del evento</h1>
            <label>
              Invitados:
              <input
                type="number"
                value={totalGuests}
                onChange={e => setTotalGuests(Number(e.target.value))}
              />
            </label>
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

          {selectedParts.map(partId => {
            const part = parts.find(p => p._id === partId)
            return (
              <div key={partId}>
                <h2>{part.name}</h2>

                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchInputs[partId] || ""}
                  onChange={e => handleSearchChange(partId, e.target.value)}
                  />
                <ul>
                  {(searchResults[partId] || []).map(product => (
                    <li className="search-results" key={product._id}>
                      <button className="btns" onClick={() => handleAddProductToPart(partId, product._id)}>
                        Añadir
                      </button>
                      {product.name}
                    </li>
                  ))}
                </ul>

                <h3>Productos seleccionados:</h3>
                <div className="lists">
                  <ul>
                    {(selectedProducts[partId] || []).map(prod => (
                      <li key={prod._id}>{prod.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </section>
        <section>
          <h2>Total materiales:</h2>
          <div className="btns">
            <button onClick={handleCalculateMaterials}>Calcular Materiales</button>
            <button onClick={() => exportMaterialsToPDF(totalMaterials, totalGuests)}>Descargar PDF</button>
          </div>
          <div className="lists">
            <ul>
              {totalMaterials.map((mat, idx) => (
                <li key={idx}>
                  {mat.material?.name} ({mat.quantity})
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}

export default UserPage