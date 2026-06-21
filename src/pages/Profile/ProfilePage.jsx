import { useLocation } from "react-router-dom";
import ProfileHeader from "./components/ProfileHeader.jsx";
import Todo from "./components/Todo.jsx";
import Diary from "./components/Diary.jsx";
import Calendar from "./components/Calendar.jsx";
import { getCurrentUser } from "../../utils/localStorage.js";
export default function ProfilePage() {
    const location = useLocation();
    const currentUser = getCurrentUser();
    const isMyProfile = location.state?.isMyProfile ?? true; 
    const userName = location.state?.userName ?? currentUser?.id ?? "guest";
    const introduce = currentUser?.introduce ?? "로그인하면 자기소개가 표시돼요.";
    const favGroups = currentUser?.favGroups ?? [];

    return (
        <>
        <div style={style.profileSection}>
            <ProfileHeader isMyProfile={isMyProfile} userName={userName} introduce={introduce} favGroups={favGroups} />
            <div style={style.calendarTodoDiary}>
              <div style={style.todoDiary}> 
                <Todo isMyProfile={isMyProfile}/>
                {isMyProfile && <Diary />}
              </div>
              <Calendar />
            </div>
        </div>
    </>
  );
}

const style = {
  profileSection: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    marginLeft: "240px",
    padding: "40px 50px",
    alignItems: "stretch",
  },
  calendarTodoDiary: {
    display: "flex",
    flexDirection: "row",
    gap: "35px",
    justifyContent: "flex-start",
  },
  todoDiary: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    flex: 1,
  },
};
