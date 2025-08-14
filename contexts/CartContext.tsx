'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface CartItem {
  variant?: Record<string, any>;
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  size?: string
  color?: string
  quantity: number
  inStock: boolean
}

interface CartState {
  items: CartItem[]
  totalItems: number
  subtotal: number
  shipping: number
  tax: number
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'MOVE_TO_WISHLIST'; payload: number }

const demoItems: CartItem[] = [
  // Demo cart items
  {
    id: 1,
    name: 'Diamond Tennis Bracelet Elite',
    price: 3299,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
    category: 'Jewelry',
    brand: 'Flyfe Elite',
    size: 'Medium',
    quantity: 1,
    inStock: true
  },
  {
    id: 2,
    name: 'Swiss Chronograph Watch',
    price: 5899,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
    category: 'Watches',
    brand: 'Flyfe Premium',
    quantity: 1,
    inStock: true
  },
  {
    id: 3,
    name: 'Pearl Drop Earrings',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
    category: 'Jewelry',
    brand: 'Flyfe',
    quantity: 2,
    inStock: true
  }
]

function calculateTotals(items: CartItem[]): Omit<CartState, 'items'> {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 500 ? 0 : 25 // Free shipping over $500
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return {
    totalItems,
    subtotal,
    shipping,
    tax,
    total
  }
}

const initialState: CartState = {
  items: demoItems,
  ...calculateTotals(demoItems)
}

function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[]

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      )

      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }
      break

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.payload)
      break

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        newItems = state.items.filter(item => item.id !== action.payload.id)
      } else {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
      break

    case 'CLEAR_CART':
      newItems = []
      break

    case 'MOVE_TO_WISHLIST':
      // Remove from cart (wishlist logic would be handled separately)
      newItems = state.items.filter(item => item.id !== action.payload)
      break

    default:
      return state
  }

  return {
    items: newItems,
    ...calculateTotals(newItems)
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  moveToWishlist: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const moveToWishlist = (id: number) => {
    dispatch({ type: 'MOVE_TO_WISHLIST', payload: id })
  }

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      moveToWishlist
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
