import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">E-Commerce</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          Cart
          {cart.length > 0 && <span className="cart-signal"></span>}
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;