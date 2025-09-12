import { auth } from "@/services/api/auth.api"
import { User } from "@/services/types/user"
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react"

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (credentials: { identifiant: string; password: string }) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const login = async (credentials: { identifiant: string; password: string }) => {
    setLoading(true)
    try {
      const u: User = await auth(credentials)
      console.log(u);
      
      setUser(u)
      return u
    } finally {
      setLoading(false)
    }
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}
