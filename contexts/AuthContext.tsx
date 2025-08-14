'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AuthService, LoginCredentials, RegisterData } from '@/lib/services/auth'
import { User } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User }

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      }
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        error: null
      }
    
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload
      }
    
    case 'LOGOUT':
      return {
        ...initialState
      }
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    
    default:
      return state
  }
}

interface AuthContextType {
  state: AuthState
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  clearError: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const authService = new AuthService()

  // Load user from localStorage on mount
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = localStorage.getItem('flyfe_token')
        const storedUser = localStorage.getItem('flyfe_user')
        
        if (storedToken && storedUser) {
          const user = JSON.parse(storedUser)
          dispatch({ 
            type: 'AUTH_SUCCESS', 
            payload: { user, token: storedToken } 
          })
          
          // Verify token is still valid
          try {
            const profile = await authService.getProfile()
            dispatch({ type: 'UPDATE_USER', payload: profile })
          } catch (error) {
            // Token expired, clear storage
            localStorage.removeItem('flyfe_token')
            localStorage.removeItem('flyfe_user')
            dispatch({ type: 'LOGOUT' })
          }
        }
      } catch (error) {
        console.error('Error loading stored auth:', error)
        localStorage.removeItem('flyfe_token')
        localStorage.removeItem('flyfe_user')
      }
    }

    loadStoredAuth()
  }, [])

  // Save to localStorage whenever auth state changes
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.token) {
      localStorage.setItem('flyfe_token', state.token)
      localStorage.setItem('flyfe_user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('flyfe_token')
      localStorage.removeItem('flyfe_user')
    }
  }, [state.isAuthenticated, state.user, state.token])

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.login(credentials)
      dispatch({ 
        type: 'AUTH_SUCCESS', 
        payload: { user: response.user, token: response.token } 
      })
    } catch (error: any) {
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: error.message || 'Login failed' 
      })
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.register(data)
      dispatch({ 
        type: 'AUTH_SUCCESS', 
        payload: { user: response.user, token: response.token } 
      })
    } catch (error: any) {
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: error.message || 'Registration failed' 
      })
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
  }

  const forgotPassword = async (email: string) => {
    try {
      await authService.forgotPassword(email)
    } catch (error: any) {
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: error.message || 'Password reset failed' 
      })
      throw error
    }
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user })
  }

  return (
    <AuthContext.Provider value={{
      state,
      login,
      register,
      logout,
      forgotPassword,
      clearError,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
