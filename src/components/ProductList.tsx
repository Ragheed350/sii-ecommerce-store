import React, { useEffect, useState } from "react"
import { Product } from "../types"
import axios from "axios"

const ProductList = () => {
  const [products, setproducts] = useState<Product[]>([])
  const [sortedProducts, setSortedProducts] = useState<Product[]>([])
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")

  const sortProducts = () => {
    const sorted = [...products].sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1
      return 0
    })
    setSortedProducts(sorted)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const filterProducts = () => {
    let filteredProducts = [...products]

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory)
    }

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter((product) => product.price < selectedPrice)
    }

    if (selectedColor) {
      filteredProducts = filteredProducts.filter((product) => product.colors.includes(selectedColor.toLowerCase()))
    }

    setSortedProducts(filteredProducts)
  }

  const resetFilters = () => {
    setSelectedCategory("")
    setSelectedPrice(0)
    setSelectedColor("")
    setSortedProducts([])
  }

  const sortedArray = sortedProducts.length ? sortedProducts : products

  useEffect(() => {
    axios.get("https://course-api.com/react-store-products").then((response) => setproducts(response.data))
  }, [])

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1">
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="kitchen">Kitchen</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <select
            id="price"
            name="price"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(Number(e.target.value))}
          >
            <option value={0}>All</option>
            <option value={2000}>Less than $2000</option>
            <option value={3000}>Less than $3000</option>
            <option value={4000}>Less than $4000</option>
            <option value={4500}>Less than $4500</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <select
            id="color"
            name="color"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">All</option>
            <option value="#FF0000">Red</option>
            <option value="#0000ff">Blue</option>
            <option value="#008000">Green</option>
            <option value="#FFFF00">Yellow</option>
            <option value="#800080">Purple</option>
            <option value="#ffb900">Orange</option>
          </select>
        </div>

        <div>
          <button
            onClick={filterProducts}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply Filters
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="col-span-3">
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={sortProducts}
            className="flex items-center bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-300"
          >
            Sort {sortOrder === "asc" ? "A-Z" : "Z-A"} <SortIcon />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sortedArray.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SortIcon = () => (
  <svg
    className="w-4 h-4 ml-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 17l6-6-6-6M18 7l-6 6 6 6" />
  </svg>
)

export default ProductList
