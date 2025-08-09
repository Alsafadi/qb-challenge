'use client'

import { useCart } from '@/context/CartContext'
import { addToast, Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)
  const { addToCart, refreshCart } = useCart()
  const addProductToCart = async () => {
    setLoading(true)
    try {
      // Add to cart and wait for it to complete fully
      await addToCart(productId)

      // Force a refresh to ensure we have the latest data
      await refreshCart()

      addToast({
        title: 'Item added to cart',
        description: 'The item has been successfully added to your cart.',
        color: 'success',
      })
    } catch (error) {
      console.error('Error adding product to cart:', error)
      addToast({
        title: 'Error adding to cart',
        description: 'There was an error adding the item to your cart.',
        color: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      color="primary"
      variant="solid"
      endContent={<Icon icon="lucide:shopping-cart" />}
      onPress={addProductToCart}
      className="w-full"
      isLoading={loading}
    >
      Add to Cart
    </Button>
  )
}
