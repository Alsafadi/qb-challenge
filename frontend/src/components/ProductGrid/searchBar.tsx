'use client'
import { Product } from '@/types/Product'
import { Input } from '@heroui/react'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'

export const SearchBar = ({
  products,
  setFilteredProducts,
  setSearching,
}: {
  products: Product[]
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>
  setSearching: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const fuse = new Fuse(products, {
    keys: ['name', 'description'],
    threshold: 0.3,
  })

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
      setSearching(false)
      return
    }
    setSearching(true)
    const results = fuse.search(searchQuery).map((result) => result.item)
    setFilteredProducts(results)
  }, [searchQuery, setFilteredProducts, products])

  return (
    <Input
      placeholder="Search products..."
      className="w-full"
      value={searchQuery}
      onChange={(e) => {
        const query = e.target.value
        setSearchQuery(query)
      }}
    />
  )
}
