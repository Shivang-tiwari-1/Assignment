import React, { useContext, useEffect } from "react";
import UserContext from "../../context/User/UserContext";

const Cart = () => {
  const { getCart, reload, cart, deleteCartItem, checkoutCart } =
    useContext(UserContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart();
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, [reload]);

  const totalPrice =
    cart && cart.length > 0
      ? cart.reduce(
          (acc, item) => acc + Number(item.price) * Number(item.qty),
          0
        )
      : 0;

  const handleCheckout = async () => {
    await checkoutCart(cart);
    if (!cart || cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    alert(`Checkout successful! Total amount: $${totalPrice.toFixed(2)}`);
  };

  const handleDelete = async (id) => {
    await deleteCartItem(id);
    await getCart(); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h1>

      {!cart || cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {item.name}
                </h2>
                <p className="text-gray-600">Quantity: {item.qty}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-800">
                  ${Number(item.price) * Number(item.qty)}
                </span>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg mt-6 font-bold text-xl">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
