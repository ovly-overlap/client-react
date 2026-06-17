import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "../src/pages/Signup"
import Login from "../src/pages/Login"
import './index.css';
import App from "./App.jsx"

createRoot(document.getElementById('root')).render(
  <App/>
)