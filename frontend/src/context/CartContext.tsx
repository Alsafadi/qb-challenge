import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

export type CartType = Record<string, number>

interface CartContextProps {
  cart: CartType
  setCart: (cart: CartType) => void
  addToCart: (productId: string, quantity?: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  numCartItems: number
  refreshCart: () => Promise<void>
  lastUpdated: Date | null
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export function useCart() {
  const ctx = useContext(CartContext)

  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartType>({})
  const [numCartItems, setNumCartItems] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  // Fetch cart from API
  const refreshCart = async () => {
    try {
      const res = await fetch('/api/cart')
      const data = await res.json()
      setCart(data.cart || {})
    } catch {
      setCart({})
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  useEffect(() => {
    setLastUpdated(new Date())
  }, [cart])
  useEffect(() => {
    setNumCartItems(Object.values(cart).reduce((a, b) => a + b, 0))
  }, [cart])

  const addToCart = async (productId: string, quantity: number = 1) => {
    // Optimistically update UI
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity,
    }))
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    })
    refreshCart()
  }

  const removeFromCart = async (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      delete newCart[productId]
      return newCart
    })
    await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    })
    refreshCart()
  }

  const clearCart = async () => {
    setCart({})
    await fetch('/api/cart', { method: 'DELETE' })
    refreshCart()
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        numCartItems,
        refreshCart,
        lastUpdated: lastUpdated,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
