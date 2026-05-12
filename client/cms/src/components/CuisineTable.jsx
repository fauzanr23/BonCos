import { useState } from "react";
import EditButton from "./EditButton";
import UploadPhoto from "./UploadPhoto";
import { formattedTime } from "../helpers/FormattedTime";
import { rupiahFormat } from "../helpers/RupiahFormat";
import { NavLink, useParams } from "react-router";
import axios from "axios";
import { url } from "../constants/url";
import Toastify from "toastify-js";
import FormCuisines from "./FormCuisines";

export default function TableCuisines({
  fetchCuisines,
  cuisines,
  setSelectedCuisine,
  setCuisineId,
  selectedCuisine,
  cuisineId,
}) {
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("");

  //handleDelete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      await fetchCuisines();
      Toastify({
        text: "Success deleted",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
      }).showToast();
      return;
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
      {openModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            {mode === "edit" ? (
              <FormCuisines
                setOpenModal={setOpenModal}
                selected={selectedCuisine}
                mode={mode}
                id={cuisineId}
                fetchCuisines={fetchCuisines}
              />
            ) : (
              <UploadPhoto setOpenModal={setOpenModal} fetchCuisines={fetchCuisines} id={cuisineId} cuisine={selectedCuisine} />
            )}
          </div>
        </dialog>
      )}
      <div className="overflow-x-auto mx-10">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Author</th>
              <th>Created</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table */}
          {cuisines.map((el, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <th>
                    <label>{i + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 hover:scale-105 cursor-pointer">
                          <img
                            src={el.imgUrl}
                            alt="Food"
                            onClick={() => {
                              setOpenModal(true);
                              setCuisineId(el.id)
                              setSelectedCuisine(el)
                              fetchCuisines = { fetchCuisines };
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{el.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="line-clamp-1">{el.description}</p>
                  </td>
                  <td>{rupiahFormat(el.price)}</td>
                  <td>{el.Category?.name}</td>
                  <td>{el.User?.email}</td>
                  <td>{formattedTime(el.createdAt)}</td>
                  <td>{formattedTime(el.updatedAt)}</td>
                  <td>
                    <div className="flex gap-2 justify-center items-center">
                      <NavLink to={`/cuisines/${el.id}`}>
                        <button className="btn btn-ghost btn-xs bg-blue-400">
                          Detail
                        </button>
                      </NavLink>
                      <EditButton
                        onClick={() => {
                          setMode("edit");
                          setOpenModal(true);
                          setCuisineId(el.id);
                          setSelectedCuisine(el);
                        }}
                      />
                      <button
                        className="btn btn-ghost btn-xs bg-red-400"
                        onClick={() => {
                          handleDelete(el.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}
