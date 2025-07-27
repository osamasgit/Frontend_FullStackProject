import { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [materials, setMaterials] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://backend-fullsatckproject.onrender.com/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchMaterials = async () => {
    try {
      const res = await fetch('https://backend-fullsatckproject.onrender.com/api/materials')
      const data = await res.json()
      setMaterials(data)
    } catch (error) {
      console.error('Error fetching materials:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchMaterials()
  }, [])

  return (
    <>
    <div className='container'>
      <section>
        <h1>Productos</h1>
        <h2>Crear productos</h2>
        <ProductForm
          key={editingProduct ? editingProduct._id : 'new-product'}
          product={editingProduct}
          materials={materials}
          onSave={async (productData) => {
            try {
                if (editingProduct) {
                    await fetch(`https://backend-fullsatckproject.onrender.com/api/products/${editingProduct._id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productData),
                      })
                  } else {
                      await fetch('https://backend-fullsatckproject.onrender.com/api/products', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(productData),
                      })
                  }
                  setEditingProduct(null)
                  fetchProducts()
              } catch (error) {
              console.error('Error saving product:', error)
            }
          }}
          onCancel={() => setEditingProduct(null)}
        />

        <h2>Lista de productos</h2>
        <ProductList
          products={products}
          onEdit={setEditingProduct}
          onDelete={async (id) => {
            try {
                await fetch(`https://backend-fullsatckproject.onrender.com/api/products/${id}`, {
                    method: 'DELETE',
                  })
                  fetchProducts()
              } catch (error) {
                  console.error('Error deleting product:', error)
              }
          }}
          />
      </section>
    </div>
    </>
  )
}