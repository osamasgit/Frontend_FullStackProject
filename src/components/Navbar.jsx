import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { useEffect } from "react"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, isAuthenticated } = useAuth()
  const isAdmin = location.pathname.startsWith("/admin")

  const handleLogout = async () => {
  try {
    await logout()
    navigate("/", { replace: true })
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
  }
}

  return (
    <nav className="navbar">
      <img src="/assets/cropped-Esca-Logo.png" alt="Logo ESCA" />
      <div className="menu">
        {isAdmin && (
          <>
            <Link to="/admin/products">Productos</Link>
            <Link to="/admin/materials">Materiales</Link>
          </>
        )}

        {isAdmin ? (
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/admin">Admin</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar