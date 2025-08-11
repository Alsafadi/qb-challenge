import { Select, SelectItem } from '@heroui/react'
import { useEffect, useState } from 'react'

export const SelectCategory = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}) => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const results = await fetch(`/api/categories`)
        if (!results.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await results.json()
        setCategories(
          data.categories.sort((a: string, b: string) => a.localeCompare(b)),
        )
      } catch (error) {
        // Optionally handle error here
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="flex flex-wrap gap-2">
      {categories && categories.length > 0 ? (
        <Select
          label="Category"
          selectionMode="multiple"
          selectedKeys={selectedCategories}
          placeholder="Category"
          className="max-w-md"
          onSelectionChange={(keys) =>
            setSelectedCategories(Array.from(keys as Set<string>))
          }
        >
          {categories.map((category: string) => (
            <SelectItem key={category}>{category}</SelectItem>
          ))}
        </Select>
      ) : (
        <p>Loading Categories</p>
      )}
    </div>
  )
}
