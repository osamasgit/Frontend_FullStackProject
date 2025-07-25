import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import ProductPage from './pages/ProductPage'
import MaterialPage from './pages/MaterialPage'
import LoginPage from './pages/LoginPage'
import { useAuth } from './components/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) return <div>Cargando...</div>
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route path="materials" element={<MaterialPage />} />
          <Route path="products" element={<ProductPage />} />
        </Route>
      </Routes>
    </Router>
  )
}