import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm p-2">
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
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                onClick={() => {
                  navigate("/categories");
                }}
              >
                Categories
              </a>
            </li>
            <li>
              <details>
                <summary>Profile</summary>
                <ul className="bg-base-100 rounded-t-none p-2 z-9999 absolute text-xs">
                  <li>
                    <a
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Register
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("email");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
