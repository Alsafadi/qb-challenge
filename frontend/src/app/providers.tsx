'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { CartProvider } from '@/context/CartContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <CartProvider>{children}</CartProvider>
    </HeroUIProvider>
  )
}
