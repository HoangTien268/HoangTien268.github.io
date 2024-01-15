// ProductForm.tsx
import { randomInt } from "crypto";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/comfirm-modal";
import Header from "../shop-screen/top-bar";
import { Button } from "antd";

interface ProductFormData {
  id: number;
  category: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

const CreateProduct: React.FC = () => {
  const [newProduct, setNewProduct] = useState<ProductFormData>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listProductItem, setListProductItem] = useState<ProductFormData[]>(
    JSON.parse(localStorage.getItem("LIST_PRODUCT_ITEM")!)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();
  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    // Open the confirmation modal
    setIsModalOpen(true);
    setNewProduct({
      id: Math.floor(Math.random() * 1000),
      title: data.title,
      price: parseFloat(`${data.price}`),
      description: data.description,

      category: data.category,
      image: data.image,
    });
  };

  const handleConfirm = () => {
    localStorage.setItem(
      "LIST_PRODUCT_ITEM",
      JSON.stringify([...listProductItem, newProduct])
    );

    setIsModalOpen(false);
    navigate("/manager-product");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
      <div className="container mx-auto mt-36">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
        >
          <div className="flex justify-center">
            <h2 className="text-2xl font-semibold mb-6">Create Product</h2>
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Product Name
            </label>
            <input
              {...register("title", { required: "Product name is required" })}
              type="text"
              id="title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Price
            </label>
            <input
              {...register("price", { required: "Price is required" })}
              type="text"
              id="price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Category
            </label>
            <input
              {...register("category", {
                required: "Category name is required",
              })}
              type="text"
              id="category"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Image
            </label>
            <input
              {...register("image", { required: "Image name is required" })}
              type="text"
              id="image"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              id="description"
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-3xl flex items-center justify-center w-1/2 h-10"
            >
              Create Product
            </button>
          </div>
        </form>
        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={handleCancel}
          onConfirm={handleConfirm}
          message="Are you sure you want to create this product?"
        />
      </div>
    </div>
  );
};

export default CreateProduct;
