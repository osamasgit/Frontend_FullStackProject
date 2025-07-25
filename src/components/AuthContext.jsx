import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axios.post('http://localhost:8080/api/check-auth', { withCredentials: true })
      .then(response => {
        setIsAuthenticated(response.data.authenticated)
      })
      .catch(() => {
        setIsAuthenticated(false)
      })
  }, [])

  const login = async (username, password) => {
    try {
      await axios.post('http://localhost:8080/api/login', { username, password }, { withCredentials: true })
      setIsAuthenticated(true)
      return true
    } catch (error) {
      return false
    }
  }

  const logout = async () => {
    await axios.post('http://localhost:8080/api/logout', { withCredentials: true })
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)