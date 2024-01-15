import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./screens/shop-screen";
import Login from "./screens/login";
import Register from "./screens/register";
import EditProductForm from "./screens/edit-products";
import ManageProductForm from "./screens/manager-products";
import CreateProduct from "./screens/create-products";
import ProductDetail from "./screens/product-detail";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./recoil/authContext";
import CartProduct from "./screens/cart-product";
import ListOrder from "./screens/list-order";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBeforeUnload = () => {
    setIsLoading(true);
  };
  const handleAfterUnload = () => {
    setIsLoading(false);
  };
  window.addEventListener("beforeunload", handleBeforeUnload);
  window.addEventListener("unload", handleAfterUnload);
  return (
    <RecoilRoot>
      <AuthProvider>
        <Router>
          <div className="bg-slate-300">
            {isLoading && (
              <div className=" text-3xl fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-100 z-50">
                Loading...
              </div>
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/edit-product/:id" element={<EditProductForm />} />
              <Route path="/manager-product" element={<ManageProductForm />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/cart-product" element={<CartProduct />} />
              <Route path="/list-order" element={<ListOrder />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default App;
