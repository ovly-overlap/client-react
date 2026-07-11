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
import { getMe } from "./api/auth.js";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("accessToken");
            console.log("1. 로컬스토리지 토큰 확인:", token);

            // 토큰이 없으면 서버 찌르지도 말고 즉시 종료
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await getMe();
                console.log("2. 백엔드 인증 응답 성공res.data:", res.data);
                setUser(res.data);
            } catch (err) {
                // 토큰이 만료되었거나 이상하면 로컬스토리지 비우기
                console.error(
                    "3. 백엔드 인증 요청 실패 에러:",
                    err.response?.data || err
                );
                localStorage.removeItem("accessToken");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* 전부 로그인 필요 */}
                <Route
                    context={user}
                    element={<ProtectedRoute user={user} loading={loading} />}
                >
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
            </Routes>
        </BrowserRouter>
    );
}
export default App;
