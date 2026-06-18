import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user, loading }) {
    // 1. App.jsx에서 getMe()를 아직 부르고 있는 '로딩 중'일 때는 아무것도 하지 않고 대기합니다.
    if (loading) {
        return null; // 혹은 <div>로딩 중...</div>
    }

    // 2. 로딩이 끝났는데 유저 정보가 없다면? 국물도 없이 로그인 페이지로 튕겨냅니다.
    if (!user) {
        alert("로그인이 필요한 서비스입니다!");
        return <Navigate to="/login" replace />;
    }

    // 3. 유저 정보가 주입되었다면 하위 Route 컴포넌트들을 화면에 정상적으로 그려줍니다.
    return <Outlet />;
}
