import Navbar from "../components/Navbar";
import TableCuisines from "../components/CuisineTable";
import { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import FormCuisines from "../components/FormCuisines";
import { url } from "../constants/url";
import axios from "axios";

export default function HomePage() {
  //cuisines
  const [cuisines, setCuisines] = useState([]);
  const [cuisineId, setCuisineId] = useState(null);

  const [loading, setLoading] = useState(false);
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [mode, setMode] = useState("create");

  const fetchCuisines = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/cuisines`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setCuisines(data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);
  return (
    <>
      <Navbar />
      <div className="ml-5">
        <p>Logged in user: {localStorage.getItem("email")}</p>
      </div>
      <div className="flex justify-center">
        <h1 className="font-bold text-4xl">Cuisine List</h1>
      </div>
      <AddButton
        onClick={() => {
          setMode("create");
          setSelectedCuisine(null);
          setOpenModal(true);
        }}
      />

      {openModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="flex justify-center font-bold text-lg">
              {mode === "create" ? "Create Cuisine" : "Edit Cuisine"}
            </h3>

            <FormCuisines
              setOpenModal={setOpenModal}
              mode={mode}
              fetchCuisines={fetchCuisines}
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
        <TableCuisines
          cuisines={cuisines}
          fetchCuisines={fetchCuisines}
          setSelectedCuisine={setSelectedCuisine}
          setCuisineId = {setCuisineId}
          selectedCuisine={selectedCuisine}
          cuisineId={cuisineId}
        />
      )}
    </>
  );
}
