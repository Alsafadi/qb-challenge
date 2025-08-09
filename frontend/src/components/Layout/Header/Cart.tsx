'use client'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { ShoppingBag, XIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types/Product'

export function Cart() {
  const { cart, numCartItems, lastUpdated } = useCart()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [cartProducts, setCartProducts] = useState<
    (Product & { quantity: number })[]
  >([])

  // Fetch product info whenever cart changes
  useEffect(() => {
    // Load product info for all items in the cart
    console.log('cart init in cart.tsx')
    const fetchAllProducts = async () => {
      const ids = Object.keys(cart)
      const idsString = ids.join(',')
      if (!idsString) return

      try {
        const products = await fetch(`/api/productinfo?ids=${idsString}`)
        const data = await products.json()

        const productsArray = data.products || []
        const uniqueProductsMap: Record<string, Product> = {}
        productsArray.forEach((product: Product) => {
          uniqueProductsMap[product.id] = product
        })
        const uniqueProducts = Object.values(uniqueProductsMap)
        setCartProducts(
          uniqueProducts.map((product) => ({
            ...product,
            quantity: cart[product.id] || 0,
          })),
        )
      } catch (error) {
        console.error(`Failed to fetch product ${idsString}:`, error)
      }
    }

    fetchAllProducts()
  }, [cart, lastUpdated])

  return (
    <>
      <Button onPress={onOpen}>
        <div className="flex items-center gap-2">
          <span className="text-blurple">
            <ShoppingBag />
          </span>
          <span>
            <b>{numCartItems}</b> items in cart
          </span>
        </div>
      </Button>
      <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex  gap-1">
                <span className="inline text-blurple">
                  <ShoppingBag />
                </span>{' '}
                Shopping Cart
              </ModalHeader>
              <ModalBody>
                <ul className="space-y-2">
                  {cartProducts.map((product) => (
                    <li key={product.id}>
                      <div className="grid grid-cols-[1fr_auto] gap-3 items-center bg-foreground-100 p-2 rounded-xl px-4">
                        <div className="flex flex-col justify-between">
                          <span className="font-bold">{product.name}</span>
                          <span className="text-right">
                            {product.quantity} × {product.price} SEK ={' '}
                            {product.quantity * Number(product.price)} SEK
                          </span>
                        </div>
                        <div>
                          <button
                            className="bg-white p-1 rounded-full px-2"
                            onClick={() =>
                              alert(
                                'To be implemented \n api/cart file is not to be modified, and it does not have delete function yet.',
                              )
                            }
                          >
                            <XIcon className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-end gap-2">
                  <b>Total:</b>{' '}
                  {cartProducts.reduce(
                    (acc, product) =>
                      acc + Number(product.price) * Number(product.quantity),
                    0,
                  )}{' '}
                  SEK
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    alert(
                      'To be implemented \n api/cart file is not to be modified, and it does not have delete function yet.',
                    )
                  }
                >
                  Empty Cart
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
