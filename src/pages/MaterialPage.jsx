import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import MaterialList from '../components/MaterialList'
import MaterialForm from '../components/MaterialForm'

export default function MaterialPage() {
  const [materials, setMaterials] = useState([])
  const [editingMaterial, setEditingMaterial] = useState(null)

  const fetchMaterials = async () => {
    const response = await fetch('http://localhost:8080/api/materials')
    const data = await response.json()
    setMaterials(data)
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  return (
    <>
    <div className='container'>
      <section>
        <h1>Materiales</h1>
        <h2>Crear material</h2>
        <MaterialForm
          key={editingMaterial ? editingMaterial._id : 'new-material'}
          material={editingMaterial}
          onSave={async (materialData) => {
            if (editingMaterial) {
              await fetch(`http://localhost:8080/api/materials/${editingMaterial._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(materialData),
              })
            } else {
              await fetch('http://localhost:8080/api/materials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(materialData),
              })
            }
            setEditingMaterial(null)
            fetchMaterials()
          }}
          onCancel={() => setEditingMaterial(null)}
        />
        <h2>Lista de materiales</h2>
          <MaterialList
            materials={materials}
            onEdit={setEditingMaterial}
            onDelete={async (id) => {
              await fetch(`http://localhost:8080/api/materials/${id}`, { method: 'DELETE' })
              fetchMaterials()
            }}
          />
      </section>
    </div>
    </>
  )
}