import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../../recoil/authState";
import { foundAccountState } from "../../../recoil/fountAccountState";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { cartState } from "../../../recoil/cartState";

const Header: React.FC = () => {
  const [accountValue, setAccountValue] = useRecoilState(foundAccountState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const closeNav = () => {
    setIsNavOpen(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccountValue(null);
  };
  return (
    <div className="relative">
      <div className="flex items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center gap-1 space-x-4 w-2/5">
          <button
            onClick={toggleNav}
            className="text-white w-36 text-center focus:outline-none text-2xl font-semibold"
          >
            Menu
          </button>
        </div>

        <button
          className="justify-center text-center w-2/5"
          onClick={() => {
            navigate("/");
            // window.location.reload();
          }}
        >
          <h1 className="text-white text-6xl font-bold">Shop DEMO</h1>
        </button>

        <div className="auth-links flex items-center justify-end space-x-4 w-2/5">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  navigate("/cart-product");
                }}
                className="flex items-center relative inline-block "
              >
                <ShoppingCartOutlined className="text-3xl" />
                {cartItems.length > 0 && (
                  <div className="bg-red-500 text-white rounded-lg w-4 text-xs absolute top-0 -right-1">
                    {cartItems.length}
                  </div>
                )}
              </button>
              <span className="text-white text-xl">
                Hello,{accountValue?.firstName}
              </span>
              <button onClick={handleLogout} className="text-white text-xl">
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="flex items-center relative inline-block  "
                onClick={() => {
                  navigate("/cart-product");
                }}
              >
                <ShoppingCartOutlined className="text-3xl" />
                {cartItems.length > 0 && (
                  <div className="bg-red-500 text-white rounded-lg w-4 text-xs absolute top-0 -right-1">
                    {cartItems.length}
                  </div>
                )}
              </button>
              <Link to="/" className="text-white text-xl">
                Home
              </Link>
              <Link to="/login" className="text-white text-xl">
                Login
              </Link>
              <Link to="/register" className="text-white text-xl">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isNavOpen && (
        <div
          onClick={closeNav}
          className="fixed inset-0 bg-black opacity-0 z-50"
        />
      )}

      {/* Dropdown Menu */}
      {isNavOpen && (
        <div className="flex lg:flex-col lg:w-auto z-50 absolute border-spacing-1 bg-gray-500 text-black p-4">
          <Link
            to="/create-product"
            className="text-white py-2 hover:bg-gray-700"
          >
            Create Products
          </Link>
          <Link
            to="/manager-product"
            className="text-white py-2 hover:bg-gray-700"
          >
            Manager List Product
          </Link>
          <Link to="/list-order" className="text-white py-2 hover:bg-gray-700">
            Manager List Order
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
