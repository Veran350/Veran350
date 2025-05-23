import React, { useEffect, useState } from "react";

const products = [
  { id: 1, name: "Product A", price: 50, image: "url_to_image" },
  { id: 2, name: "Product B", price: 75, image: "url_to_image" },
  { id: 3, name: "Product C", price: 100, image: "url_to_image" },
];

const Shop = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch the cart from the server
    fetch("http://localhost:3000/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const addToCart = (product) => {
    // Send the request to the backend to add the product to the cart
    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product.id }),
    })
      .then((response) => response.json())
      .then((data) => setCart(data.cart))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="mb-2" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mt-2">
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
