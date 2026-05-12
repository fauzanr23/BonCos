import { useState } from "react";
import Toastify from "toastify-js";
import { url } from "../constants/url";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // harus dihandle karena terdapat refresh page ketika submit.
    try {
      
      const {data} = await axios.post(`${url}/login`, {email, password})
      
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("email", email);

      navigate('/')
    } catch (error) {
      Toastify({
        text: error.response.data.message,
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
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex justify-center items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-lg">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </form>
    </>
  );
}
