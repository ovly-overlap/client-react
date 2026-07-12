import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.js";

export default function ProtectedRoute() {
    const hasToken = !!localStorage.getItem("accessToken");

    const { data: user, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
        enabled: hasToken,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        alert("로그인이 필요한 서비스입니다!");
        return <Navigate to="/login" replace />;
    }

    return <Outlet context={user} />;
}
