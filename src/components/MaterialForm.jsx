import { useState, useEffect } from 'react'

export default function MaterialForm({ material, onSave, onCancel }) {
  const [name, setName] = useState('')

  useEffect(() => {
    setName(material ? material.name : '')
  }, [material])

  const handleSubmit = e => {
    e.preventDefault()
    onSave({ name })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Material name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <button type="submit">{material ? 'Update' : 'Create'}</button>
      {material && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  )
}
