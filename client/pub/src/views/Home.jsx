import { useState } from "react";
import CardCuisine from "../components/Cards";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import axios from "axios";
import { url } from "../../../cms/src/constants/url";
import { useEffect } from "react";
import { NavLink } from "react-router";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [cuisines, setCuisines] = useState([]);

  //pagination
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [dataPerPage, setDataPerPage] = useState(null);

  //filters
  const [filterName, setFilterName] = useState("");
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(null);
  const [sort, setSort] = useState("name");

  const fetchCuisines = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/pub/cuisines`, {
        params: { page, filterName, catId, sort },
      });

      setPage(data.page);
      setTotalData(data.totalData);
      setDataPerPage(data.dataPerPage);
      setTotalPages(data.totalPage);
      setCuisines(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/pub/categories`);

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCuisines();
    fetchCategories();
  }, [page, filterName, catId, sort]);
  return (
    <>
      <Navbar
        setFilterName={setFilterName}
        categories={categories}
        setCatId={setCatId}
        setSort={setSort}
        sort={sort}
      />
      {loading ? (
        <>
          <div className="min-h-screen from-orange-50 to-amber-50">
            <p className="flex justify-center items-center">Loading...</p>
          </div>
        </>
      ) : cuisines.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 p-10 justify-center items-center gap-10 min-h-screen bg-linear-to-b from-orange-50 to-amber-50">
            {/* Card */}
            {cuisines.map((el, i) => {
              return (
                <NavLink
                  key={i}
                  to={`/cuisines/${el.id}`}
                  className="hover:scale-102 cursor-pointer"
                >
                  <CardCuisine el={el} key={el.id} />
                </NavLink>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-5">
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              totalData={totalData}
              dataPerPage={dataPerPage}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex p-10 justify-center items-center gap-10 min-h-screen bg-linear-to-b from-orange-50 to-amber-50">
            <p>Cuisine not found</p>
          </div>
        </>
      )}
    </>
  );
}
