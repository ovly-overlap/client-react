import Nav from "./Nav.jsx";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}
