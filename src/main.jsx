import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "../src/pages/signup"
import Login from "../src/pages/login"
import './index.css';
import App from "./App.jsx"

createRoot(document.getElementById('root')).render(
  <App/>
  // <BrowserRouter>
  //   <Routes>
  //     {/* <Route path="/" element={<Signup />} />
  //     <Route path="/login" element={<Login />} /> */}
  //   </Routes>
  // </BrowserRouter>
)