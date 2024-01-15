// ManageProductForm.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/comfirm-modal";
import Header from "../shop-screen/top-bar";

interface ManagerProduct {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  title: string;
  description: string;
}

const ManageProductForm: React.FC = () => {
  const navigate = useNavigate();
  // const [products, setProducts] = useState<ManagerProduct[]>([]);

  // Function to fetch product data from an API
  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get("https://fakestoreapi.com/products");
  //     if (response.data) {
  //       setProducts(response.data);
  //     }
  //   } catch (error) {
  //   }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  // const { handleSubmit } = useForm<ManageProductFormData>();

  // const handleEdit = (id: number) => {
  //   onEdit(id);
  // };

  const [listProductItem, setListProductItem] = useState<ManagerProduct[]>(
    JSON.parse(localStorage.getItem("LIST_PRODUCT_ITEM")!)
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setProductToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      const newList = listProductItem.filter(
        (product) => product.id !== productToDelete
      );
      setListProductItem(newList);
      localStorage.setItem("LIST_PRODUCT_ITEM", JSON.stringify(newList));
      setIsConfirmationModalOpen(false);
      setProductToDelete(null);
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setProductToDelete(null);
  };
  // const handleDelete = (id: number) => {
  //   const shouldDelete = window.confirm(
  //     "Are you sure you want to delete this product?"
  //   );

  //   if (shouldDelete) {
  //     const newList = listProductItem.filter((product) => product.id !== id);
  //     setListProductItem(newList);
  //     localStorage.setItem("LIST_PRODUCT_ITEM", JSON.stringify(newList));
  //   }
  // };
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="container mx-auto pt-36">
        <div className=" mx-auto bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-5xl font-semibold mb-6 text-center">
            Manage Products
          </h2>
          <div className="max-h-screen overflow-y-auto">
            {listProductItem.map((product) => (
              <div key={product.id} className="mb-7 flex border-2 py-2 pl-2">
                <div
                  className="aspect-w-1 aspect-h-1 w-24"
                  onClick={() => {
                    navigate(`/product-detail/${product.id}`, {
                      state: { product: product },
                    });
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" object-cover w-full h-full rounded-md"
                    style={{
                      minHeight: "60px",
                      maxHeight: "60px",
                      minWidth: "60px",
                      maxWidth: "60px",
                    }}
                  />
                </div>
                <div className="w-4/5">
                  <p className="text-gray-600">{product.title}</p>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <p className="text-gray-600">
                    Category: {product.category.toUpperCase()}
                  </p>
                </div>

                <div className="mt-2 space-x-2 flex items-center">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white hover:bg-blue-600 rounded-3xl flex items-center justify-center w-28 h-10"
                    onClick={() => {
                      navigate(`/edit-product/${product.id}`, {
                        state: { product: product, list: listProductItem },
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 text-white hover:bg-red-600 rounded-3xl flex items-center justify-center w-28 h-10"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onRequestClose={closeConfirmationModal}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this product?"
        />
      </div>
    </div>
  );
};

export default ManageProductForm;
