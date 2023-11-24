import React, { useEffect, useState } from "react"
import { Breadcrumb } from "../components/Breadcrumb"
import axios from "axios"
import { Product, ProductDetailsType } from "../types"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../components/redux/store"
import { AddToCart } from "../components/redux/reducers/cart"

type Props = {}

export default function ProductDetails({}: Props) {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const [product, setproduct] = useState<ProductDetailsType>()

  const handleAddProduct = (product: ProductDetailsType) => {
    dispatch(AddToCart(product))
  }

  useEffect(() => {
    axios.get(`https://course-api.com/react-store-single-product?id=${id}`).then((response) => setproduct(response.data))
  }, [])

  if (!product) {
    return <>Loading...</>
  } else
    return (
      <div>
        <Breadcrumb />
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <div className="flex flex-row">
              <div className="w-1/3">
                <img
                  src={product?.images[0].url ?? "https://source.unsplash.com/random/400x400"}
                  alt="Product Image"
                  className="rounded-lg"
                />
                <div className="flex items-center mt-4">
                  {product?.images.map(({ id, url }) => (
                    <img
                      key={id}
                      src={url}
                      alt="Product Image"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2"
                    />
                  ))}
                </div>
              </div>

              <div className="w-2/3 pl-8">
                <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {product?.stars &&
                      Array.from(Array(Math.round(product?.stars)).keys()).map((el) => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <polygon points="12 2 15.09 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.5 12 2"></polygon>
                        </svg>
                      ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{product?.description} </p>
                <div className="text-lg mb-4">
                  <ul>
                    <li>
                      <span className="font-medium">Available:</span> {product?.stock}
                    </li>
                    <li>
                      <span className="font-medium">SKU:</span> {product?.id}
                    </li>
                    <li>
                      <span className="font-medium">Brand:</span> {product?.company}
                    </li>
                    <li>
                      <span className="font-medium">Colors:</span> {product?.colors.map((color) => color).join(", ")}
                    </li>
                  </ul>
                </div>
                <div className="flex items-center mb-4">
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                    </svg>
                  </button>
                  <span className="text-xl">1</span>
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                <button
                  className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
                  onClick={() => handleAddProduct(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
