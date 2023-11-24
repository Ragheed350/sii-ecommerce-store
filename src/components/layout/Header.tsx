import React from "react"
import { Outlet, Link } from "react-router-dom"
import { useAppSelector } from "../redux/store"

type Props = {}

export default function Header({}: Props) {
  const { cart } = useAppSelector((state) => state.CartSlice)
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center">
          <img src="https://source.unsplash.com/random" alt="Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-black text-lg font-bold">My App</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-black">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="text-black">
                About
              </a>
            </li>
            <li>
              <a href="/" className="text-black">
                Products
              </a>
            </li>
          </ul>
        </nav>
        <div className="space-x-2">
          <Link to={"/cart"}>
            <button className="text-black">Cart {cart.length}</button>
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  )
}
