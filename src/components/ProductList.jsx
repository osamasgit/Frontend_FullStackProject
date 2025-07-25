export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <ul>
        {products.map(p => (
          <li key={p._id}>
            <div className="lists">
              <button onClick={() => onEdit(p)}>Editar</button>
              <button onClick={() => onDelete(p._id)}>Borrar</button>
              {p.name}
            </div>  
          </li>
        ))}
      </ul>
  )
}