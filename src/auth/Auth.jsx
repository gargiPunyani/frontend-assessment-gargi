import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      setUser({ name: "admin", email: "admin@gmail.com" })
    } else {
      setUser(null)
    }
  }, [token])

  const login = (username, password) => {
    if (username === "admin@gmail.com" && password === "admin123") {
      const t = "test-jwt-token"
      localStorage.setItem("token", t)
      setToken(t)
      return true
    } else {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
