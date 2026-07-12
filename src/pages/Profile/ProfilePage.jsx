import { useLocation, useParams } from "react-router-dom";
import ProfileHeader from "./components/ProfileHeader.jsx";
import Todo from "./components/Todo.jsx";
import Diary from "./components/Diary.jsx";
import Calendar from "./components/Calendar.jsx";
import { getCurrentUser } from "../../utils/localStorage.js";
import { useUser } from "../../hook/useUser.js";
import { useProfile } from "../../hook/useProfile.js";

export default function ProfilePage() {
  const location = useLocation();
  const { data: currentUser } = useUser();
  const isMyProfile = location.state?.isMyProfile ?? true;
  const userName = location.state?.userName ?? currentUser?.username ?? "guest";
  const introduce =
    currentUser?.introduce ?? "설정에서 자기소개를 설정해주세요";
  const favGroups = currentUser?.favGroups ?? [];

  const { data: me } = useUser();
  const userId = currentUser.id;
  const { data: profile } = useProfile(userId);

  console.log("current Use r: ", currentUser);
  console.log("profile: ", profile);

  return (
    <>
      <div style={style.profileSection}>
        <ProfileHeader isMyProfile={isMyProfile} profile={profile?.profile} />
        <Todo isMyProfile={isMyProfile} schedules={profile?.schedules} />
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
