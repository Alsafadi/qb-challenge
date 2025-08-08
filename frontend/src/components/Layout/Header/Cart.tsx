'use client'
import { Cart as CartType } from '@/app/api/cart/route'
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
import { useEffect, useState } from 'react'

export function Cart() {
  const [numCartItems, setNumCartItems] = useState(-1)
  const [cartItems, setCartItems] = useState<CartType>({})
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [itemNames, setItemNames] = useState<{ [id: string]: string }>({})
  const [itemPrices, setItemPrices] = useState<{ [id: string]: number }>({})
  const [totalPrice, setTotalPrice] = useState(0)

  const fetchItemName = async (id: string) => {
    if (itemNames[id]) return itemNames[id]
    const product = await fetch(`/api/product?id=${id}`)
    const data = await product.json()
    const name = data.name || `Item ${id}`
    const price = data.price || 0
    setItemNames((prev) => ({ ...prev, [id]: name }))
    setItemPrices((prev) => ({ ...prev, [id]: price }))
    setTotalPrice((prev) => prev + price * (cartItems[id] || 0))
    return name
  }

  useEffect(() => {
    fetch('/api/cart', {
      // Disables nextjs cache. But feel free to use it if you want.
      cache: 'no-store',
    })
      .then((res) => res.json() as Promise<{ cart: CartType }>)
      .then((data) => {
        setNumCartItems(Object.values(data.cart).reduce((a, b) => a + b, 0))
        // Assuming the cart items are stored as { productId: quantity }
        setCartItems(data.cart)
      })
  }, [])

  return (
    <>
      <Button onPress={onOpen}>
        <div className="flex items-center gap-2">
          <span className="text-blurple">
            <ShoppingBag />
          </span>
          {numCartItems >= 0 ? (
            <span>
              <b>{numCartItems}</b> items in cart
            </span>
          ) : (
            <span>loading...</span>
          )}
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
                  {Object.entries(cartItems).map(([id, quantity]) => (
                    <li key={id}>
                      {itemNames[id] ? (
                        <div className="grid grid-cols-[1fr_auto] gap-3 items-center bg-foreground-100 p-2 rounded-xl px-4">
                          <div className="flex flex-col justify-between">
                            <span className="font-bold">{itemNames[id]}</span>
                            <span className="text-right">
                              {quantity} × {itemPrices[id]} SEK ={' '}
                              {quantity * itemPrices[id]} SEK
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
                              <XIcon className="inline-block w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          Loading...
                          {fetchItemName(id)}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end gap-2">
                  <b>Total:</b> {totalPrice} SEK
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
