import { IoAddCircle } from "react-icons/io5";
export default function AddButton({onClick}) {
  return (
    <>
      <div className="mb-5 ml-10"> 
      <button onClick={onClick} className="btn btn-lg bg-green-400 hover:scale-105"><IoAddCircle /> Add</button>
      </div>
    </>
  );
}
