import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./top-bar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/cartState";
import { loginState } from "../../recoil/authState";

interface IShopItem {
  id: number;
  category: string;
  desciption: string;
  price: number;
  image: string;
  title: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<IShopItem[]>([]);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [inputValue, setInputValue] = useState<any>();
  const [filterProduct, setFilterProduct] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [listCategory, setListCategory] = useState<any>();
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response.data) {
        setProducts(response.data);
        localStorage.setItem(
          "LIST_PRODUCT_ITEM",
          JSON.stringify(response.data)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const state = useLocation();
  const listProductItem: IShopItem[] = JSON.parse(
    localStorage.getItem("LIST_PRODUCT_ITEM")!
  );
  const getListCategory = (products: IShopItem[]) => {
    const categories: string[] = [];
    products.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  };
  useEffect(() => {
    fetchProducts();
    if (!inputValue) {
      setInputValue("");
    }
  }, []);
  useEffect(() => {
    setListCategory(getListCategory(products));
    // Thực hiện điều gì đó với danh sách uniqueCategories, có thể lưu vào state nếu cần thiết.
  }, [products]);
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className=" mx-auto px-48 pt-10 pt-36">
        <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
        <div className=" flex gap-2 justify-end w-full ">
          {/* <h2 className="text-3xl font-semibold mb-4 text-center md:w-2/3 lg:w-full md:pl-60">
            Welcome to Our Shop
          </h2> */}
          <div className="flex gap-2">
            <div className="flex items-center text-nowrap">
              Lọc theo danh mục
            </div>
            <div className="h-full">
              <select
                className="h-full"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {listCategory?.map((category: any) => (
                  <option key={category} value={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Type..."
              className="bg-white text-gray-700 px-2 py-1 rounded h-12 md:w-1/12 lg:w-full shadow-md "
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />

            <Button
              className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-2xl flex items-center justify-center w-1/3 h-12"
              onClick={() => {
                setFilterProduct(
                  listProductItem.filter((product) => {
                    const titleMatch =
                      product.title
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) !== -1;
                    const categoryMatch =
                      !selectedCategory ||
                      product.category === selectedCategory;
                    return titleMatch && categoryMatch;
                  })
                );
              }}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1.5  ">
          {!filterProduct
            ? listProductItem.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 mb-10 mt-10 rounded-md shadow-md flex flex-col items-center sm:w-full md:w-full lg:w-3/4"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {product.title.length > 13
                      ? `${product.title.slice(0, 13)}...`
                      : product.title}
                  </h3>
                  <p className="text-gray-800 font-semibold">
                    Price: ${product.price}
                  </p>
                  <div
                    className="aspect-w-1 aspect-h-1"
                    onClick={() => {
                      navigate(`/product-detail/${product.id}`, {
                        state: { product: product },
                      });
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className=" object-cover w-full h-full rounded-md"
                      style={{ minHeight: "200px", maxHeight: "200px" }}
                    />
                  </div>
                  <div className="mt-4 flex space-x-4 justify-center lg:w-full md:w-full">
                    <Button
                      className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-2xl flex items-center justify-center lg:w-2/5 md:w-1/5"
                      onClick={() => {
                        navigate(`/product-detail/${product.id}`, {
                          state: { product: product },
                        });
                      }}
                    >
                      View Detail
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white flex items-center rounded-2xl justify-center hover:bg-green-600 lg:w-2/5 md:w-1/5 "
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
                    </Button>
                  </div>
                </div>
              ))
            : filterProduct.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-white p-4 mb-10 mt-10 rounded-md shadow-md flex flex-col items-center sm:w-full md:w-full lg:w-3/4"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {product.title.length > 13
                      ? `${product.title.slice(0, 13)}...`
                      : product.title}
                  </h3>
                  <p className="text-gray-800 font-semibold">
                    Price: ${product.price}
                  </p>
                  <div
                    className="aspect-w-1 aspect-h-1"
                    onClick={() => {
                      navigate(`/product-detail/${product.id}`, {
                        state: { product: product },
                      });
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className=" object-cover w-full h-full rounded-md"
                      style={{ minHeight: "200px", maxHeight: "200px" }}
                    />
                  </div>
                  <div className="mt-4 flex space-x-4 justify-center lg:w-full md:w-full">
                    <Button
                      className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-2xl flex items-center justify-center lg:w-2/5 md:w-1/5"
                      onClick={() => {
                        navigate(`/product-detail/${product.id}`, {
                          state: { product: product },
                        });
                      }}
                    >
                      View Detail
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white flex items-center rounded-2xl justify-center hover:bg-green-600 lg:w-2/5 md:w-1/5 "
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
                    </Button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
