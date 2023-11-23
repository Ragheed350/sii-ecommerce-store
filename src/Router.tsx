import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Products from "./pages/products"
import ProductDetails from "./pages/product-details"
import Cart from "./pages/cart"
import Header from "./components/layout/Header"

type Props = {}

export default function AppRouter({}: Props) {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Header />,
      children: [
        {
          path: "",
          element: <Products />,
          loader: () => <>Loading...</>,
        },
        { path: "/:id", element: <ProductDetails />, loader: () => <>Loading...</> },
        { path: "/cart", element: <Cart />, loader: () => <>Loading...</> },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
