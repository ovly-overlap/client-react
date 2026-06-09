// import Settings from "./pages/Settings.jsx"
import Nav from './components/Nav.jsx'
import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/ProfilePage.jsx'
import Settings from './pages/Settings/Settings.jsx'
import TimeLine from './pages/signup.jsx'
// import Signup from "./pages/Signup.jsx"
// import Signup from "./pages/signup.jsx"
// import Login from "./pages/login.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/timeline" element={<TimeLine />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
