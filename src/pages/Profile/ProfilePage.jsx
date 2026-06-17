import { useLocation } from "react-router-dom";
import ProfileHeader from "./components/ProfileHeader.jsx";
import Todo from "./components/Todo.jsx";
import Diary from "./components/Diary.jsx";
import Calendar from "./components/Calendar.jsx";
export default function ProfilePage() {
    const location = useLocation();
    const isMyProfile = location.state?.isMyProfile ?? true; 
    const userName = location.state?.userName ?? "myUserName";
    return (
        <>
        <div style={style.profileSection}>
            <ProfileHeader isMyProfile={isMyProfile} userName={userName} />
            <Todo isMyProfile={isMyProfile}/>
            <Calendar />
        </div>
        </>
    )
}

const style = {
    profileSection : {
        margin: '40px 0px 0px 287px'
    }
}