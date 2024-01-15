// EditProductForm.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/comfirm-modal";
import Header from "../shop-screen/top-bar";

interface EditProductFormData {
  id: number;
  category: string;
  title: string;
  price: number;
  image: string;
  description: string;
}
const EditProductForm: React.FC = () => {
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listProductManager, setListProductManager] = useState<
    EditProductFormData[]
  >(state.list);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProductFormData>({});
  const onSubmitHandler: SubmitHandler<EditProductFormData> = (data) => {
    const newListManager = listProductManager.filter(
      (product: any) => product.id != data.id
    );
    const newProduct = {
      id: parseFloat(`${data.id}`),
      title: data.title,
      price: parseFloat(`${data.price}`),
      description: data.description,

      category: data.category,
      image: data.image,
    };
    // setListProductManager((prevList) => [...prevList, newProduct]);
    localStorage.setItem(
      "LIST_PRODUCT_ITEM",
      JSON.stringify([...newListManager, newProduct])
    );
    navigate("/manager-product");
  };
  const onSubmit: SubmitHandler<EditProductFormData> = (data) => {
    // Open the confirmation modal
    setIsModalOpen(true);
    const newListManager = listProductManager.filter(
      (product: any) => product.id != data.id
    );
    const newProduct = {
      id: parseFloat(`${data.id}`),
      title: data.title,
      price: parseFloat(`${data.price}`),
      description: data.description,

      category: data.category,
      image: data.image,
    };
    setListProductManager([...newListManager, newProduct]);
  };

  const handleConfirm = () => {
    localStorage.setItem(
      "LIST_PRODUCT_ITEM",
      JSON.stringify(listProductManager)
    );
    setIsModalOpen(false);
    navigate("/manager-product");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-slate-300 -z-50"></div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-32"
      >
        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            ID
          </label>
          <input
            {...register("id", { required: "Product name is required" })}
            type="text"
            id="id"
            defaultValue={state.product.id}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
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
            defaultValue={state.product.title}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
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
            type="number"
            id="price"
            defaultValue={state.product.price}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
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
            {...register("category", { required: "category is required" })}
            type="text"
            id="category"
            defaultValue={state.product.category}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
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
            {...register("image", { required: "image is required" })}
            type="text"
            id="image"
            defaultValue={state.product.image}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            description
          </label>
          <textarea
            {...register("description", {
              required: "description is required",
            })}
            id="description"
            defaultValue={state.product.description}
            className="w-full h-36 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* <div className="mb-4"> */}
        {/* <label
          htmlFor="description"
          className="block text-gray-600 text-sm font-medium mb-2"
        >
          Description
        </label> */}
        {/* <textarea
          {...register("description", { required: "Description is required" })}
          id="description"
          rows={4}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )} */}
        {/* </div> */}
        <div className="flex justify-center gap-7">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-3xl flex items-center justify-center w-28 h-10"
            onClick={() => {
              navigate("/manager-product");
            }}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-3xl flex items-center justify-center w-28 h-10"
          >
            Save Changes
          </button>
        </div>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        onConfirm={handleConfirm}
        message="Are you sure you want to edit this product?"
      />
    </div>
  );
};

export default EditProductForm;
