import axios from "axios";
import ModalButtons from "./ModalButtons";
import Toastify from "toastify-js";
import { url } from "../constants/url";
import { useState } from "react";

export default function UploadPhoto({
  setOpenModal,
  fetchCuisines,
  id,
  cuisine,
}) {
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const image = e.target.files[0];

    if (image) {
      setFile(image); //saving image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgUrl", file);
    try {
      const { data } = await axios.patch(
        `${url}/cuisines/${id}/imgUrl`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      setOpenModal(false);
      fetchCuisines();
    } catch (error) {
      Toastify({
        text: error.response?.data?.message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="col-span-full">
          <div className="flex justify-center">
            <label htmlFor="cuisineImage" className="block text-sm/6">
              <img
                src={cuisine.imgUrl}
                alt="Food"
                className="w-32 h-32 object-cover"
              />
            </label>
          </div>
            <p className="font-medium text-gray-900 flex justify-center items-center">
              {cuisine.name}
            </p>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            {!file ? (
              <div className="text-center">
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="imgUrl"
                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="imgUrl"
                      name="imgUrl"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF
                </p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <p>Uploaded file: {file.name}</p>
                  </div>
                  <label
                    htmlFor="imgUrl"
                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                  >
                    <p>Change photo</p>
                    <input
                      id="imgUrl"
                      name="imgUrl"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </>
            )}
          </div>
          <ModalButtons setOpenModal={setOpenModal} />
        </div>
      </form>
    </>
  );
}
