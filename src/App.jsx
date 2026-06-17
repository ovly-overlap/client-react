
import Nav from './components/Nav.jsx'
import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/ProfilePage.jsx'
import Settings from './pages/Settings/Settings.jsx'
import TimeLine from './pages/TimeLine/TimeLine.jsx'
import IdolNews from './pages/Home/IdolNews.jsx'
import FavGroupsPage from './pages/Profile/FavGroupsPage.jsx'
import OtherUserProfile from './pages/Profile/OtherUserProfile.jsx'
import Signup from "./pages/signup.jsx"
import Login from "./pages/login.jsx"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { getCurrentUser } from './utils/localStorage.js'

function ProtectedRoute({ children }) {
  return getCurrentUser() ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute><TimeLine /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/idol-news" element={<ProtectedRoute><IdolNews /></ProtectedRoute>} />
        <Route path="/fav-groups" element={<ProtectedRoute><FavGroupsPage /></ProtectedRoute>}/>
        <Route path="/other-user-profile" element={<ProtectedRoute><OtherUserProfile /></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
