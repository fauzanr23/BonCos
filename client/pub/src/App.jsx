import "toastify-js/src/toastify.css";
import { Routes, Route } from "react-router";
import DetailPage from './views/Details'
import HomePage from './views/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="cuisines/:id" element={<DetailPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
