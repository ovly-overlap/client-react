import Nav from "./components/Nav.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/ProfilePage.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import TimeLine from "./pages/TimeLine/TimeLine.jsx";
import IdolNews from "./pages/Home/IdolNews.jsx";
import FavGroupsPage from "./pages/Profile/FavGroupsPage.jsx";
import OtherUserProfile from "./pages/Profile/OtherUserProfile.jsx";
// import Signup from "./pages/Signup.jsx"
// import Signup from "./pages/signup.jsx"
// import Login from "./pages/login.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Layout } from "./components/Layout.jsx";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* 전부 로그인 필요 */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/timeline" element={<TimeLine />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/idol-news" element={<IdolNews />} />
                        <Route path="/fav-groups" element={<FavGroupsPage />} />
                        <Route
                            path="/other-user-profile"
                            element={<OtherUserProfile />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
