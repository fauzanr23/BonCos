import { useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { useNavigate } from "react-router";
export default function Navbar({
  setFilterName,
  categories,
  setCatId,
  setSort,
  sort,
}) {
  const [curCat, setCurCat] = useState("Categories");
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm p-2 ">
        <div className="flex-1">
          <a
            className="btn btn-ghost text-xl"
            onClick={() => {
              navigate("/");
            }}
          >
            Bon Cos
          </a>
        </div>
        <div className="flex-none mr-10">
          <input
            type="text"
            placeholder="Search Food"
            className="input input-bordered w-24 md:w-auto mb-2 md:h-8"
            onChange={(e) => {
              setFilterName(e.target.value);
            }}
          />
          <ul className="menu menu-horizontal px-1">
            <li>
              <p>
                <MdOutlineSort
                  size={20}
                  className={sort === "-name" ? "text-primary" : ""}
                  onClick={() => {
                    setSort((prev) => (prev === "-name" ? "name" : "-name"));
                  }}
                />
              </p>
            </li>
            <li className="relative">
              <details>
                <summary>{curCat}</summary>
                <ul className="bg-base-100 rounded-t-none p-2 absolute mt-1 text-xs max-h-40 overflow-y-auto w-40 shadow z-50">
                  <li>
                    <a
                      onClick={() => {
                        setCatId(null);
                        setCurCat("Categories")
                      }}
                    >
                      All
                    </a>
                  </li>
                  {categories.map((el, i) => {
                    return (
                      <li key={i}>
                        <a
                          onClick={() => {
                            setCatId(el.id);
                            setCurCat(el.name);
                          }}
                        >
                          {el.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
