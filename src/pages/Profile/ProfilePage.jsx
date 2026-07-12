import { useLocation } from "react-router-dom";
import ProfileHeader from "./components/ProfileHeader.jsx";
import Todo from "./components/Todo.jsx";
import Diary from "./components/Diary.jsx";
import Calendar from "./components/Calendar.jsx";
import { getCurrentUser } from "../../utils/localStorage.js";
import { useUser } from "../../hook/useUser.js";
export default function ProfilePage() {
    const location = useLocation();
    const currentUser = getCurrentUser();
    const isMyProfile = location.state?.isMyProfile ?? true;
    const userName = location.state?.userName ?? currentUser?.id ?? "guest";
    const introduce =
        currentUser?.introduce ?? "로그인하면 자기소개가 표시돼요.";
    const favGroups = currentUser?.favGroups ?? [];

    const { data: user } = userUser();

    return (
        <>
            <div style={style.profileSection}>
                <ProfileHeader
                    isMyProfile={isMyProfile}
                    userName={userName}
                    introduce={introduce}
                    favGroups={favGroups}
                />
                <Todo isMyProfile={isMyProfile} />
                {isMyProfile && <Diary />}
                <div style={style.contentLayout}>
                    <Calendar />
                </div>
            </div>
        </>
    );
}

const style = {
    profileSection: {
        margin: "40px 0px 0px 287px",
    },
    contentLayout: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "40px",
    },
};
