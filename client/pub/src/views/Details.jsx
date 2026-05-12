import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../../../cms/src/constants/url";
import { useParams } from "react-router";
import { rupiahFormat } from "../helpers/RupiahFormat";

export default function DetailPage() {
  const { id } = useParams();
  const [cuisine, setCuisine] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCuisineById = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/pub/cuisines/${id}`);

      setCuisine(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisineById();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div>
            <p className="flex justify-center items-center ">Loading...</p>
          </div>
        </>
      ) : (
        <>
          <div className="navbar bg-base-100 p-2 ">
            <div className="flex-1">
              <a  
                className="text-3xl font-bold flex justify-center items-center hover:cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Bon Cos
              </a>
            </div>
          </div>
          <div className="hero bg-linear-to-b from-orange-50 to-amber-50 border-black border min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
              <img
                src={cuisine.imgUrl}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div className="">
                <div className="badge badge-secondary">
                  {cuisine.Category?.name}
                </div>
                <h1 className="text-5xl font-bold">{cuisine.name}</h1>
                <p className="pt-6">{cuisine.description}</p>
                <p className="font-bold text-xl">
                  {rupiahFormat(cuisine.price)}
                </p>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="bg-black text-white px-4 py-2 rounded transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer mt-2"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
