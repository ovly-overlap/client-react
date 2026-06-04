import { useState } from "react";
import "./ProfilePage.css";
import Profile from "./components/Profile.jsx";
import Todo from "./components/Todo.jsx";
import Diary from "./components/Diary.jsx";
import Calendar from "./components/Calendar.jsx";
export default function ProfilePage() {
    return (
        <>
        <div className="profile-section">
            <Profile />
            {/* <Todo />
            <Diary />
            <Calendar /> */}
        </div>
        </>
    )
}