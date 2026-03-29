import { useEffect, useState } from "react";
import API from "../services/api";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
        {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
  <ShoppingBag className="w-12 h-12 mb-4 text-primary-light" />

  <p className="text-lg font-medium text-gray-700">
    No orders yet
  </p>

  <p className="text-sm text-gray-400 mt-1 mb-4 text-center">
    Your orders will appear here once you make a purchase.
  </p>

  <button
    onClick={() => navigate("/")}
    className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
  >
    Start Shopping
  </button>
</div>
      )}

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">
          <p className="font-bold">
            Total: ${order.totalPrice}
          </p>
          <p className="text-sm text-gray-500">
            Status: {order.status}
          </p>

          <div className="mt-2">
            {order.products.map((item) => (
              <p key={item._id}>
                {item.product.name} x {item.quantity}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}