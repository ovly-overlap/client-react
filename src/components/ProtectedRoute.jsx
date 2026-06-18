import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user, loading }) {
    // 1. App.jsx에서 getMe()를 아직 부르고 있는 '로딩 중'일 때는 아무것도 하지 않고 대기합니다.
    if (loading) {
        return null; // 혹은 <div>로딩 중...</div>
    }

    if (!user) {
        alert("로그인이 필요한 서비스입니다!");
        return <Navigate to="/login" replace />;
    }

    return <Outlet context={user} />;
}
