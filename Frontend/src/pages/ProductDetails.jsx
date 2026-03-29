import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   API.get(`/products/${id}`)
  //     .then((res) => setProduct(res.data.data));
  // }, [id]);
useEffect(() => {
  API.get(`/products/${id}`)
    .then((res) => {
      console.log("DATA:", res.data);
      setProduct(res.data);
    })
    .catch((err) => console.log("ERROR:", err));
}, [id]);
  const addToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (err) {
      alert("Login first");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={product.image} className="w-full h-64 object-cover rounded-xl" />

      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>

      <div className="flex justify-between items-center mt-6">
        <span className="text-xl text-primary font-bold">
          ${product.price}
        </span>

        <button
          onClick={addToCart}
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}