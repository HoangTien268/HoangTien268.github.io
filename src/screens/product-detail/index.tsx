// ProductDetail.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../shop-screen/top-bar";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/cartState";
import { loginState } from "../../recoil/authState";

interface IShopItem {
  id: number;
  category: string;
  description: string;
  price: number;
  image: string;
  title: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const navigate = useNavigate();
  const [product, setProduct] = useState<IShopItem | null>(null);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://fakestoreapi.com/products/${id}`
  //       );
  //       if (response.data) {
  //         setProduct(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi tải chi tiết sản phẩm:", error);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);
  const listProduct = JSON.parse(localStorage.getItem("LIST_PRODUCT_ITEM")!);

  if (!product) {
    setProduct(listProduct.find((product: any) => product.id == id));
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
      <div className="max-w-screen-lg mx-auto p-6 mt-36">
        <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-4">
            <img
              src={product.image}
              alt={product.description}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <div>
            <p className="text-gray-800 font-semibold">
              Category: {product.category}
            </p>
            <p className="text-gray-800 font-semibold">Giá: ${product.price}</p>
            <p className="text-gray-800 font-semibold">
              Description: {product.description}
            </p>
            <div className="flex gap-7">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-3xl flex items-center justify-center w-28 h-10"
              >
                Back
              </button>
              <button
                className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white hover:bg-green-600 rounded-3xl flex items-center justify-center w-28 h-10"
                onClick={() => {
                  if (isLoggedIn) {
                    const existingItem = cartItems.find(
                      (item) => item.id === product.id
                    );

                    if (existingItem) {
                      setCartItems((prevCartItems) =>
                        prevCartItems.map((item) =>
                          item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        )
                      );
                    } else {
                      setCartItems((prevCartItems) => [
                        ...prevCartItems,
                        { ...product, quantity: 1 },
                      ]);
                    }
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
