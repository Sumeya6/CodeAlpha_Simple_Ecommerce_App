import { useEffect, useState } from "react";
import API from "../services/api";
import { ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    API.get("/cart")
      .then((res) => setCart(res.data.products || []))
      .catch(() => setCart([]));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    await API.delete("/cart/remove", {
      data: { productId: id },
    });
    fetchCart();
  };

  const updateQty = async (id, qty) => {
    await API.put("/cart/update", {
      productId: id,
      quantity: qty,
    });
    fetchCart();
  };

  const createOrder = async () => {
    try {
      await API.post("/orders");
      alert("Order placed 🎉");
      fetchCart();
    } catch {
      alert("Cart is empty 😭");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {cart.length === 0 && <div className="flex flex-col items-center justify-center py-20 text-center">
    <ShoppingCart className="w-16 h-16 text-primary mb-4" />
    <h2 className="text-2xl font-semibold text-">Your Cart is Empty</h2>
    <p className="text-gray-500 mt-2">
      You haven’t added any items yet. Start shopping to fill your cart!
    </p>
    <button
      onClick={() => window.location.href = "/"}
      className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
    >
      Return to Shop
    </button>
  </div>}
  {/* {cart.length === 0 && (
  <div className="flex flex-col items-center justify-center text-center py-16">
    
    <div className="bg-primary/10 p-6 rounded-full mb-4">
      <ShoppingCart size={48} className="text-primary" />
    </div>

    <h2 className="text-xl font-semibold text-gray-800">
      Your cart is empty
    </h2>

    <p className="text-gray-500 mt-2 max-w-sm">
      Looks like you haven’t added anything yet. Start shopping and fill your cart with awesome items.
    </p>

    <button
      onClick={() => window.location.href = "/"}
      className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
    >
      Return to Shop
    </button>
  </div>
)} */}

      {cart.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 mb-3 rounded shadow flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">{item.product.name}</h2>
            <p className="text-sm text-gray-500">
              ${item.product.price}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                updateQty(item.product._id, Number(e.target.value))
              }
              className="w-16 border p-1 rounded"
            />

            <button
              onClick={() => removeItem(item.product._id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <button
          onClick={createOrder}
          className="bg-primary text-white px-6 py-2 rounded mt-4"
        >
          Place Order
        </button>
      )}
    </div>
  );
}