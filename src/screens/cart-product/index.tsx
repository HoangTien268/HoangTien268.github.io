import React, { useState } from "react";
import { Button, Checkbox, InputNumber } from "antd"; // Assuming you want to use InputNumber for quantity input
import Header from "../shop-screen/top-bar";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/cartState";

const CartProduct: React.FC = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const removeFromCart = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleItemSelection = (productId: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        selectedItems.includes(item.id)
          ? total + item.price * item.quantity
          : total,
      0
    );
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
      <div className="fixed top-0 left-0 w-full z-10 ">
        <Header />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center mt-36">
        Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-3xl font-semibold mb-4 text-center mt-36">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex w-full ">
          <div className="w-full ml-52 bg-white  ">
            <div className="mb-4 flex justify-center item w-full text-2xl font-semibold bg-blue-200 ">
              Cart Detail
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex justify-center item w-full "
              >
                <div className="flex w-full items-center justify-center">
                  <Checkbox
                    className="mr-2"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                  />

                  <img
                    src={item.image}
                    alt={item.name}
                    className=" object-cover w-full h-full rounded-md pr-3"
                    style={{
                      minHeight: "60px",
                      maxHeight: "60px",
                      minWidth: "60px",
                      maxWidth: "60px",
                    }}
                  />

                  <div className="w-1/3">
                    <p className="text-gray-600">{item.title}</p>
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <p className="text-gray-600">
                      Category: {item.category.toUpperCase()}
                    </p>
                  </div>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>
                      updateQuantity(item.id, value as number)
                    }
                    className="mr-4"
                  />
                  <Button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className=" w-full mr-52 ml-8  gap-5">
            <div className=" flex justify-center item w-full text-2xl font-semibold bg-blue-200 ">
              Order Details
            </div>
            <div className="bg-white p-5 pb-8 ">
              {cartItems.map((items) =>
                selectedItems.map((item) => {
                  if (items.id === item) {
                    return (
                      <div className="flex">
                        <p className="text-gray-600 text-2xl w-4/5 flex justify-start">
                          {items.title.length > 40
                            ? `${items.title.slice(0, 40)}... x ${
                                items.quantity
                              }`
                            : `${items.title} x ${items.quantity}`}
                        </p>
                        <p className="text-gray-600 text-2xl flex justify-end">
                          {" "}
                          Price: ${items.price * items.quantity}
                        </p>
                      </div>
                    );
                  }
                })
              )}
              <div className="flex justify-end">
                <div>
                  <p className="text-2xl font-semibold w-full pt-6 pb-6">
                    Total: ${calculateTotal()}
                  </p>
                  <Button
                    className="bg-green-500 text-white text-2xl rounded-md hover:bg-green-600 flex items-center w-36 h-1/3 justify-center "
                    disabled={calculateTotal() > 0 ? false : true}
                    onClick={() => {
                      const updatedCartItems = cartItems.filter((product) => {
                        return !selectedItems.includes(product.id);
                      });
                      const productRemove = cartItems.filter((product) => {
                        return selectedItems.includes(product.id);
                      });
                      setCartItems(updatedCartItems);
                      const oldListOrder = JSON.parse(
                        localStorage.getItem("LIST_ORDER")!
                      );
                      const newOrder = {
                        product: productRemove,
                        total: calculateTotal(),
                      };
                      localStorage.setItem(
                        "LIST_ORDER",
                        JSON.stringify([...oldListOrder, newOrder])
                      );
                    }}
                  >
                    Pay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
