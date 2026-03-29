import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {orders.length === 0 && <p>No orders yet</p>}

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