import { useEffect, useState } from "react";
import API from "../services/api";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        const msg = err.response?.data?.message || "Failed to load orders";
        showToast(msg, "error");
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setOrders([]);
        }
      });
  }, [navigate, showToast]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <ShoppingBag className="w-16 h-16 mb-4 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-md">
            Looks like you haven’t placed an order yet. Add items to your cart and place your first order.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h2>
                  <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">Total: ${order.totalPrice.toFixed(2)}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === "delivered" ? "bg-green-100 text-green-700" : order.status === "shipped" ? "bg-blue-100 text-blue-700" : order.status === "processing" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Items</h3>
                <ul className="space-y-2">
                  {order.products.map((item) => (
                    <li key={item._id} className="flex justify-between text-sm text-gray-700">
                      <span>{item.product?.name || "Unknown product"} x {item.quantity}</span>
                      <span>${(item.product?.price * item.quantity ?? 0).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}