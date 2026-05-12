import { useEffect, useState } from "react";
import ModalButtons from "./ModalButtons";
import axios from "axios";
import { url } from "../constants/url";
import Toastify from "toastify-js";

export default function FormCuisines({
  setOpenModal,
  selected,
  mode,
  id,
  fetchCuisines,
}) {
  const [name, setName] = useState(selected?.name || "");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState(selected?.description || "");
  const [imgUrl, setImgUrl] = useState(selected?.imgUrl || "");
  const [price, setPrice] = useState(selected?.price || 0);
  const [categoryId, setCategoryId] = useState(selected?.CategoryId || null);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        const { data } = await axios.post(
          `${url}/cuisines`,
          { name, description, price, imgUrl, CategoryId: categoryId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
      } else if (mode === "edit") {
        const { data } = await axios.put(
          `${url}/cuisines/${id}`,
          { name, description, price, imgUrl, CategoryId: categoryId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
      }

      setOpenModal(false)
      
      fetchCuisines()
    } catch (error) {
      console.log(error);
      
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
            placeholder="Cuisine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Description</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Image Url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            className="select w-full"
            name="categoryId"
            onChange={(e) => setCategoryId(e.target.value)}
            value={categoryId? categoryId : "SELECT"}
          >
            <option disabled>
              SELECT
            </option>
            {categories.map((el) => {
              return (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>

        <ModalButtons setOpenModal={setOpenModal}/>
      </form>
    </div>
  );
}
