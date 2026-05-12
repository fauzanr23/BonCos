import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../constants/url";
import Toastify from "toastify-js";

export default function Form() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // harus dihandle karena terdapat refresh page ketika submit.
    try {
      const { data } = await axios.post(
        `${url}/add-user`,
        {
          email,
          username,
          password,
          phoneNumber,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      navigate("/");
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 m-10">
          <div className="border-b border-gray-900/10 pb-12">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900 flex justify-center">
                Add User
              </h1>
            </div>
            <h2 className="text-base/7 font-semibold text-gray-900">
              Personal Information
            </h2>
            <h4 className="font-extralight">*required field</h4>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email Address*
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="text"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password*
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="text"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phoneNumber"
                    type="text"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    id="address"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <SubmitButton/>
          </div>
        </div>
      </form>
    </>
  );
}
