import { useEffect, useState } from "react";
import FormCategory from "../components/FormCategory";
import AddButton from "../components/AddButton";
import TableCategories from "../components/CategoryTable";
import Navbar from "../components/Navbar";
import axios from "axios";
import { url } from "../constants/url";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  //modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mode, setMode] = useState("create");

  //get Data
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="font-bold text-4xl">Category List</h1>
      </div>
      <AddButton
        onClick={() => {
          setMode("create");
          setSelectedCategory(null);
          setOpenModal(true);
        }}
      />

      {openModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="flex justify-center font-bold text-lg">
              {mode === "create" ? "Create Category" : "Edit Category"}
            </h3>

            <FormCategory
              setOpenModal={setOpenModal}
              selected={selectedCategory}
              mode={mode}
              id={categoryId}
              fetchCategories={fetchCategories}
            />
          </div>
        </dialog>
      )}
      {loading ? (
        <>
          <div>
            <p className="flex justify-center items-center">Loading...</p>
          </div>
        </>
      ) : (
        <div className="flex justify-center mx-10">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            {categories.map((el, i) => {
              return (
                <TableCategories
                  key={i}
                  el={el}
                  index={i}
                  onClick={() => {
                    setMode("edit");
                    setSelectedCategory(el);
                    setOpenModal(true);
                    setCategoryId(el.id);
                  }}
                />
              );
            })}
          </table>
        </div>
      )}
    </>
  );
}
