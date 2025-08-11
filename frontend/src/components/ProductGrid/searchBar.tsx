'use client'
import { Input } from '@heroui/react'

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <Input
      label="Search Products"
      placeholder="Search products..."
      className="w-full"
      value={searchTerm}
      onChange={(e) => {
        const query = e.target.value
        setSearchTerm(query)
      }}
    />
  )
}
