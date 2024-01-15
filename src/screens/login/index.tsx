import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../recoil/authContext";
import { loginState } from "../../recoil/authState";
import { useRecoilState } from "recoil";
import { foundAccountState } from "../../recoil/fountAccountState";
import Header from "../shop-screen/top-bar";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setLogin } = useAuth();
  const [showError, setShowError] = useState(false);
  const [, setRecoilLogin] = useRecoilState(loginState);
  const [foundAccount, setFoundAccount] = useRecoilState(foundAccountState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  // const accountList = [
  //   {
  //     firstName: "Hoang",
  //     lastName: "Tien",
  //     email: "hoangxuantien268@gmail.com",
  //     password: "123456",
  //   },
  //   {
  //     firstName: "Cristiano",
  //     lastName: "Ronaldo",
  //     email: "Cr7@gmail.com",
  //     password: "123456",
  //   },
  // ];
  // localStorage.setItem("LIST_ACCOUNT", JSON.stringify(accountList));

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const storedAccounts = JSON.parse(
      localStorage.getItem("LIST_ACCOUNT") || "[]"
    );
    const foundAccount = storedAccounts.find(
      (account: any) => account.email === data.email
    );
    if (foundAccount && foundAccount.password === data.password) {
      setFoundAccount(foundAccount);
      setLogin(true); // Set the login state using Recoil
      setRecoilLogin(true); // Update Recoil state
      navigate("/", {
        state: { state: data },
      });
    } else {
      setShowError(true);
      setFoundAccount(null);
    }
  };

  return (
    <div className="h-full">
      <div className="fixed top-0 left-0 w-full bg-slate-300 z-10">
        <Header />
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
      <div className="max-w-md mx-auto mt-36 p-6 bg-white rounded-md shadow-md z-20">
        <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email không được để trống" })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Mật khẩu:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Mật khẩu không được để trống",
              })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4" style={{ color: "red" }}>
            {showError ? "Tài khoản hoặc mật khẩu không chính xác" : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
