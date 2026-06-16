import ProfileHeader from "./components/ProfileHeader.jsx";
import Todo from "./components/Todo.jsx";
import Diary from "./components/Diary.jsx";
import Calendar from "./components/Calendar.jsx";
export default function ProfilePage() {
    return (
        <>
        <div style={style.profileSection}>
            <ProfileHeader isMyProfile={true}/>
            <Todo isMyProfile={true}/>
            {/* <Diary />
            <Calendar /> */}
        </div>
        </>
    )
}

const style = {
    profileSection : {
        margin: '40px 0px 0px 287px'
    }
}