export default function MaterialList({ materials, onEdit, onDelete }) {
  return (
    <ul>
      {materials.map(m => (
        <li key={m._id}>
          <div className="lists">
            <button onClick={() => onEdit(m)}>Editar</button>
            <button onClick={() => onDelete(m._id)}>Borrar</button>
            {m.name}
          </div>
        </li>
      ))}
    </ul>
  )
}