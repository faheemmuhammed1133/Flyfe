'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
  discount?: number
  dateAdded: string
}

interface WishlistState {
  items: WishlistItem[]
  totalItems: number
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Omit<WishlistItem, 'dateAdded'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'MOVE_TO_CART'; payload: number }

const demoWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: 'Diamond Tennis Bracelet Elite',
    price: 3299,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 234,
    category: 'Jewelry',
    brand: 'Flyfe Elite',
    inStock: true,
    isSale: true,
    discount: 18,
    dateAdded: '2024-01-15'
  },
  {
    id: 2,
    name: 'Swiss Chronograph Watch',
    price: 5899,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
    rating: 5.0,
    reviews: 89,
    category: 'Watches',
    brand: 'Flyfe Premium',
    inStock: true,
    isNew: true,
    dateAdded: '2024-01-12'
  },
  {
    id: 3,
    name: 'Pearl Drop Earrings',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 67,
    category: 'Jewelry',
    brand: 'Flyfe',
    inStock: false,
    isSale: true,
    discount: 18,
    dateAdded: '2024-01-10'
  },
  {
    id: 4,
    name: 'Luxury Gold Necklace',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 156,
    category: 'Jewelry',
    brand: 'Flyfe Elite',
    inStock: true,
    isSale: true,
    discount: 17,
    dateAdded: '2024-01-08'
  },
  {
    id: 5,
    name: 'Diamond Stud Earrings',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 203,
    category: 'Jewelry',
    brand: 'Flyfe Premium',
    inStock: true,
    dateAdded: '2024-01-05'
  },
  {
    id: 6,
    name: 'Vintage Pocket Watch',
    price: 3599,
    image: 'https://images.unsplash.com/photo-1509048191080-d2e2678e3449?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 78,
    category: 'Watches',
    brand: 'Flyfe Heritage',
    inStock: true,
    isNew: true,
    dateAdded: '2024-01-03'
  }
]

const initialState: WishlistState = {
  items: demoWishlistItems,
  totalItems: demoWishlistItems.length
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  let newItems: WishlistItem[]

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      
      if (existingItemIndex > -1) {
        // Item already exists, don't add duplicate
        return state
      } else {
        newItems = [...state.items, { ...action.payload, dateAdded: new Date().toISOString().split('T')[0] }]
      }
      break

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.payload)
      break

    case 'CLEAR_WISHLIST':
      newItems = []
      break

    case 'MOVE_TO_CART':
      // Remove from wishlist (cart logic would be handled separately)
      newItems = state.items.filter(item => item.id !== action.payload)
      break

    default:
      return state
  }

  return {
    items: newItems,
    totalItems: newItems.length
  }
}

interface WishlistContextType {
  state: WishlistState
  addItem: (item: Omit<WishlistItem, 'dateAdded'>) => void
  removeItem: (id: number) => void
  clearWishlist: () => void
  moveToCart: (id: number) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  const addItem = (item: Omit<WishlistItem, 'dateAdded'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const moveToCart = (id: number) => {
    dispatch({ type: 'MOVE_TO_CART', payload: id })
  }

  return (
    <WishlistContext.Provider value={{
      state,
      addItem,
      removeItem,
      clearWishlist,
      moveToCart
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
