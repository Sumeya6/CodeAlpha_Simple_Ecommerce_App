import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // redirect to home after logout
  };

  // update state if token changes in localStorage (optional)
  useEffect(() => {
    const handleStorage = () => setUser(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary">Shop</h1>

      <div className="flex gap-4">

        {user ? (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <button
              onClick={logout}
              className="text-red-500 font-medium"
            >
              Logout
            </button>
          </>
        ) : (<div className="flex gap-4">
          <div className="text-[15px]"><Link to="/login">Login</Link></div>
          <div>|</div>
          <div className="text-[15px]"><Link to="/register">Register</Link></div>
        </div>)}
      </div>
    </nav>
  );
}