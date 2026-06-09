import "./ProfilePage.css";
import ProfileHeader from "./components/ProfileHeader.jsx";
import Todo from "./components/Todo.jsx";
import Diary from "./components/Diary.jsx";
import Calendar from "./components/Calendar.jsx";
export default function ProfilePage() {
    return (
        <>
        <div className="profile-section">
            <ProfileHeader />
            {/* <Todo />
            <Diary />
            <Calendar /> */}
        </div>
        </>
    )
}