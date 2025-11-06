import React, { useContext, useEffect } from "react";
import UserContext from "../../context/User/UserContext";
import AlertContext from "../../context/Alert/AlertContext";

const Home = () => {
  const { Products, setLimit, product, limit, addCart, deleteCartItem } =
    useContext(UserContext);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await Products();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = async () => {
    const newLimit = limit + 5;
    setLimit(newLimit);
    await Products();
  };

  // Trigger API after getting quantity
  const handleAddToCart = async (prod, category, price) => {
    // Ask user for quantity
    const quantity = parseInt(prompt(`Enter quantity for ${prod.name}:`));
    if (!quantity || quantity <= 0)
      return showAlert("Invalid quantity", "danger");
    console.log(quantity, category, price);
    // Only after valid quantity, call API
    await addCart(quantity, category, price);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>

      {product && product.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {product.map((prod) => (
            <div
              key={prod.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {prod.name}
              </h2>
              <p className="text-gray-600 mb-4">Price: ${prod.price}</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => handleAddToCart(prod, prod.category, prod.price)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products available.</p>
      )}

      {product && product.length > 0 && (
        <button
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
