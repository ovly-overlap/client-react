import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Signup from "./pages/Signup"
// import Login from "./pages/Login"
// import TimeLine from './pages/TimeLine'
import App from './App'

createRoot(document.getElementById('root')).render(
<App />
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Signup />} />
  //     <Route path="/login" element={<Login />} />
  //   </Routes>
  // </BrowserRouter>
)