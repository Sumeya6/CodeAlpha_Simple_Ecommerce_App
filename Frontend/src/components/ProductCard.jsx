import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />

      <h2 className="font-bold mt-2">{product.name}</h2>

      <p className="text-sm text-gray-500">
        {product.description.substring(0, 50)}...
      </p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-primary font-semibold">
          ${product.price}
        </span>

        <Link
          to={`/products/${product._id}`}
          className="bg-primary text-white px-3 py-1 rounded"
        >
          View
        </Link>
      </div>
    </div>
  );
}