import { useAppDispatch, useAppSelector } from "../components/redux/store"
import { AddToCart, ChangeQuantity, ClearCart, DeleteFromCart } from "../components/redux/reducers/cart"

const Cart = () => {
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector((state) => state.CartSlice)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    dispatch(ChangeQuantity({ itemId, newQuantity }))
  }

  const handleDeleteItem = (itemId: string) => {
    dispatch(DeleteFromCart(itemId))
  }

  const handleClearCart = () => {
    dispatch(ClearCart())
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingFee = 5
  const orderTotal = subtotal + shippingFee

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500">${item.price}</p>
            </div>
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                +
              </button>
              <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteItem(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {cart.length === 0 && <p className="text-center">Your cart is empty</p>}
      </div>
      <div className="flex justify-between mt-4">
        <a href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Continue Shopping</button>
        </a>
        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={handleClearCart}>
          Clear Shopping Cart
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping Fee:</span>
            <span>${shippingFee}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Order Total:</span>
            <span>${orderTotal}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
