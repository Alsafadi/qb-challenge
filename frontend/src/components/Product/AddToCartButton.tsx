'use client'

import { addToast, Button } from '@heroui/react'
import { Icon } from '@iconify/react'

export function AddToCartButton({ productId }: { productId: string }) {
  const addProductToCart = async () => {
    // Implement add to cart functionality
    await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    }).then((res) => {
      if (!res.ok) {
        addToast({
          title: 'Error',
          description: 'Failed to add product to cart',
          color: 'danger',
        })
      }
      addToast({
        title: 'Success',
        description: 'Product added to cart',
        color: 'success',
      })
    })
  }

  return (
    <Button
      color="primary"
      variant="solid"
      endContent={<Icon icon="lucide:shopping-cart" />}
      onPress={addProductToCart}
      className="w-full"
    >
      Add to Cart
    </Button>
  )
}
