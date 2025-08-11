'use client'
import { useEffect, useMemo, useState } from 'react'
import { Product } from '@/types/Product'
import { IndividualProduct } from './individualProduct'
import { Spinner } from '@heroui/react'
import { ListGridToggle } from './listGridToggle'
import { motion } from 'framer-motion'
import { SearchBar } from './searchBar'
import { SelectCategory } from './selectCategories'
import Fuse from 'fuse.js'
import { useCart } from '@/context/CartContext'

// in a normal situation, I would dynamically set this based on routing.
const GRID_STATE = 'challenge_isGRID'

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function ProductGrid() {
  const { cart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<string[]>([])
  const [isGrid, setIsGrid] = useState(true)
  // changed limit to 12 as it works better with grids of 2 cols 3, 4 or 6
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searching, setSearching] = useState(false)

  // Fetch products from the API
  // This product has been modified to handle inifite scroll to add more products rather than changing the displayed products
  const fetchProducts = async (page: number = 1, limit: number = 12) => {
    setLoading(true)
    try {
      //assuming the backend would be used for something else and would need pagination, I will adjust the function on the client side to handle inifit scroll here. HOWEVER, if the backend was meant to handle infinite scroll only, I would modify the backend as well.
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`)
      const data = await response.json()
      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((p) => p.id))
        const newProducts = data.products.filter(
          (p: Product) => !existingIds.has(p.id),
        )
        return [...prevProducts, ...newProducts]
      })
      setPagination({ ...data.pagination, total: products.length })
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  async function getLocalCartItems() {
    const response = await fetch('/api/cart')
    const storedCartItems = await response.json()
    setCartItems(storedCartItems.cart || [])
  }

  function getLocalGridState() {
    const storedIsGrid = localStorage.getItem(GRID_STATE)
    return storedIsGrid ? storedIsGrid === 'true' : true
  }
  function setLocalGridState(isGrid: boolean) {
    localStorage.setItem(GRID_STATE, isGrid.toString())
  }

  useEffect(() => {
    setIsGrid(getLocalGridState())
    getLocalCartItems()
    fetchProducts()
  }, [])

  // update added to cart marks when cart is updated in useCart context:
  useEffect(() => {
    getLocalCartItems()
  }, [cart])

  // Store customer selection in local storage
  useEffect(() => {
    setLocalGridState(isGrid)
  }, [isGrid])

  // handle search and category selection:
  const fuse = new Fuse(products, {
    keys: ['name', 'description'],
    threshold: 0.3,
  })

  useEffect(() => {
    console.log('Selected Categories:', selectedCategories)
    const filtered =
      selectedCategories.length > 0
        ? products.filter((product) =>
            selectedCategories.includes(product.category),
          )
        : products

    if (searchTerm.trim() === '') {
      setFilteredProducts(filtered)
      setSearching(false)
      return
    }
    setSearching(true)
    fuse.setCollection(filtered)
    const results = fuse.search(searchTerm).map((result) => result.item)
    setFilteredProducts(results)
  }, [searchTerm, products, selectedCategories])

  // simpliest way to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (pagination.hasNextPage && !loading && !searching) {
          fetchProducts(pagination.page + 1, pagination.limit)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pagination, loading])

  const viewPortClass = useMemo(() => {
    return (
      // ensure only list view possible in mobile, even if user selected grid view
      isGrid
        ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 item-strech'
        : 'flex flex-col gap-4'
    )
  }, [isGrid])

  return (
    <div className="px-4">
      {/* Changed to px-4 for better padding on smaller screens */}
      {/* Do your magic here */}
      <div className="flex flex-row max-md:flex-col gap-2 justify-between items-center bg-gray-200 p-4 mb-4 rounded-xl w-full">
        <div className="w-full">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="w-full">
          <SelectCategory
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <ListGridToggle isGrid={isGrid} setIsGrid={setIsGrid} />
      </div>
      <div className={viewPortClass}>
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: (idx - pagination.total) * 0.15,
              duration: 0.4,
            }}
          >
            <IndividualProduct
              product={product}
              isGrid={isGrid}
              inCartAlready={Object.entries(cartItems)?.some(
                ([item]) => item === product.id,
              )}
            />
          </motion.div>
        ))}
      </div>
      {loading && (
        <div className="text-center text-gray-500 mt-4">
          <Spinner
            size="md"
            className="inline-block"
            aria-label="Loading products..."
          />
        </div>
      )}
      {/* Pagination info */}
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
