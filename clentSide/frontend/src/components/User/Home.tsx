// src/components/User/Home.tsx
import React, { useContext, useEffect } from "react";
import UserContext from "../../context/User/UserContext";
import AlertContext from "../../context/Alert/AlertContext";

const Home = () => {
  const { Products, setLimit, product, limit, addCart } =
    useContext(UserContext);
  const { showAlert } = useContext(AlertContext);

  // Fetch products on mount
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

  // Load more products
  const handleLoadMore = async () => {
    const newLimit = limit + 5;
    setLimit(newLimit);
    await Products();
  };

  // Add to cart using inline quantity input
  const handleAddToCart = async (prod: any) => {
    console.log(prod)
    const qtyInput = document.getElementById(
      `qty-${prod.id}`
    ) as HTMLInputElement;
    const quantity = parseInt(qtyInput?.value || "0");

    if (!quantity || quantity <= 0) {
      return showAlert("Invalid quantity", "danger");
    }

    try {
      await addCart(quantity, prod.category, prod.price);
      showAlert(`${prod.title} added to cart!`, "success");
    } catch (error) {
      console.error("Add to cart failed", error);
      showAlert("Failed to add to cart", "danger");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>

      {product && product.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {product.map((prod) => (
            <div
              key={prod.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              {/* Optional: product image */}
              <img
                src={prod.image || "/placeholder.png"}
                alt={prod.name}
                className="h-40 w-full object-cover mb-4 rounded-md"
              />

              {/* Product Info */}
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {prod.name}
              </h2>
              <p className="text-gray-600 mb-4">Price: ${prod.price}</p>

              {/* Quantity Input */}
              <input
                type="number"
                min={1}
                defaultValue={0}
                id={`qty-${prod.id}`}
                className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
              />

              {/* Add to Cart Button */}
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => handleAddToCart(prod)}
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
