import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(username, password)
    if (success) {
      navigate('/admin')
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="container">
      <section className='login'>
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className='error'>{error}</p>}
          <div className="btns">
            <button type="submit">Entrar</button>
            <Link to='/'>Volver al inicio</Link>
          </div>
        </form>
      </section>
    </div>
  )
}