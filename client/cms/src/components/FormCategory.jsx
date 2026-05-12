import { useState } from "react";
import ModalButtons from "./ModalButtons";
import axios from "axios";
import { url } from "../constants/url";
import Toastify from "toastify-js";

export default function FormCategory({
  setOpenModal,
  selected,
  mode,
  id,
  fetchCategories,
}) {
  const [name, setName] = useState(selected?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        const { data } = await axios.post(
          `${url}/categories`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
      } else if (mode === "edit") {
        const { data } = await axios.put(
          `${url}/categories/${id}`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
      }
      setOpenModal(false);
      fetchCategories();
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
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ModalButtons setOpenModal={setOpenModal} />
      </form>
    </div>
  );
}
