'use client'

import { useEffect, useMemo, useState } from 'react'
import { Product } from '@/types/Product'
import { IndividualProduct } from './individualProduct'
import { ListGridToggle } from './listGridToggle'

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [loading, setLoading] = useState(true)
  const [isGrid, setIsGrid] = useState(true)
  const fetchProducts = async (page: number = 1, limit: number = 10) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`)
      const data = await response.json()
      setProducts(data.products)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const viewPortClass = useMemo(() => {
    return (
      // ensure only list view possible in mobile, even if user selected grid view
      isGrid
        ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 item-strech'
        : 'flex flex-col gap-4'
    )
  }, [isGrid])

  return (
    <div>
      {/* Do your magic here */}
      <div className="flex flex-row justify-between bg-gray-200 p-4 mb-4 rounded-xl w-full">
        <div className="flex-1 mr-4">search bar to be added here</div>
        <ListGridToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <div className={viewPortClass}>
        {products.map((product) => (
          <IndividualProduct
            key={product.id}
            product={product}
            isGrid={isGrid}
          />
        ))}
      </div>

      {/* This below can be removed */}
      {products.length > 0 && (
        <div className="prose prose-pre:bg-green-100 dark:prose-pre:bg-green-900 prose-pre:text-green-900 dark:prose-pre:text-green-100 mt-8 border-t pt-4">
          <h3 className="text-green-900 dark:text-green-100">
            Data structure <i>(this can be removed)</i>
          </h3>

          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify([products[0]], null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
