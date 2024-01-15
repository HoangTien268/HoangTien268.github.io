import React, { useState, useEffect } from "react";
import Header from "../shop-screen/top-bar";

const OrderListScreen = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    const savedOrderList =
      JSON.parse(localStorage.getItem("LIST_ORDER")!) || [];
    setOrderList(savedOrderList);
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
      <div className="fixed top-0 left-0 w-full z-10 ">
        <Header />
      </div>
      <div className="flex justify-center mt-40">
        <div className="bg-white w-1/2">
          <h2 className="px-5 py-5 text-2xl font-bold text-center text-white bg-slate-800">
            Danh Sách Đơn Hàng
          </h2>
          <ul>
            {orderList.map((order: any, index) => (
              <li key={index}>
                <h3 className="bg-blue-300 pl-3">Đơn hàng #{index + 1}</h3>

                <ul>
                  {order.product.map((product: any) => (
                    <li className="pl-3" key={product.id}>
                      <p>
                        {product.title} x {product.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
                <h4 className="font-bold pl-3">Tổng cộng: ${order.total}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderListScreen;
