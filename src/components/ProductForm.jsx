import { useState, useEffect } from 'react'

export default function ProductForm({ product, materials, onSave, onCancel }) {
  const [name, setName] = useState('')
  const [unitsPerGuest, setUnitsPerGuest] = useState('')
  const [selectedMaterials, setSelectedMaterials] = useState([])

  useEffect(() => {
    if (product) {
      setName(product.name || '')
      setUnitsPerGuest(product.unitsPerGuest?.toString() || '')
      setSelectedMaterials(product.materials || [])
    } else {
      setName('')
      setUnitsPerGuest('')
      setSelectedMaterials([])
    }
  }, [product])

  const handleAddMaterial = () => {
    setSelectedMaterials([...selectedMaterials, { material: materials[0]?._id || '', quantity: '' }])
  }

  const handleMaterialChange = (index, field, value) => {
    const updated = [...selectedMaterials]
    updated[index] = {
      ...updated[index],
      [field]: field === 'quantity' ? value : value
    }
    setSelectedMaterials(updated)
  }

  const handleRemoveMaterial = index => {
    setSelectedMaterials(selectedMaterials.filter((_, i) => i !== index))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const payload = {
      name,
      unitsPerGuest: parseFloat(unitsPerGuest) || 0,
      materials: selectedMaterials
        .filter(m => m.material)
        .map(m => ({
          material: m.material,
          quantity: parseFloat(m.quantity) || 0
        }))
    }
    onSave(payload)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Unidades"
        value={unitsPerGuest}
        onChange={e => setUnitsPerGuest(e.target.value)}
        required
      />

      <h4>Materiales que hacen falta</h4>
      {selectedMaterials.map((m, idx) => (
        <div key={idx}>
          <select
            value={m.material}
            onChange={e => handleMaterialChange(idx, 'material', e.target.value)}
            required
          >
            <option value="">Selecciona el material</option>
            {materials.map(mat => (
              <option key={mat._id} value={mat._id}>
                {mat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="any"
            min="0"
            value={m.quantity}
            onChange={e => handleMaterialChange(idx, 'quantity', e.target.value)}
            required
          />

          <button type="button" onClick={() => handleRemoveMaterial(idx)}>Borrar</button>
        </div>
      ))}
      <div className='btns'>
        <button type="button" onClick={handleAddMaterial}>Añadir material</button>
        <button type="submit">{product ? 'Actualizar' : 'Crear'}</button>
        {product && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}