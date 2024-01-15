import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../shop-screen/top-bar";

interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [listAccount, setListAccount] = useState<AccountFormData[]>(
    JSON.parse(localStorage.getItem("LIST_ACCOUNT")!)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>();
  useEffect(() => {
    // You can add more logic here if needed
  }, [isEmailExists]);
  const onSubmit: SubmitHandler<AccountFormData> = (data) => {
    if (listAccount.some((account) => account.email === data.email)) {
      setIsEmailExists(true);
    } else {
      const newAccount = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
      localStorage.setItem(
        "LIST_ACCOUNT",
        JSON.stringify([...listAccount, newAccount])
      );
      setIsEmailExists(false);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="max-w-md mx-auto mt-36 p-6 bg-white rounded-md shadow-md">
        <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
        <h1 className="text-2xl font-semibold mb-6">Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              Họ:
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "Họ không được để trống" })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Tên:
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: "Tên không được để trống" })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

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
              {...register("email", {
                required: "Email không được để trống",
              })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
            {isEmailExists && (
              <p className="text-red-500 text-xs mt-1">Email đã được sử dụng</p>
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
