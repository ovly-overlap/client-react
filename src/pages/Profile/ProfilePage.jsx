import { useState } from "react";
import { useLocation } from "react-router-dom";
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
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  });

  const { data: me } = useUser();
  const userId = currentUser.id;
  const { data: profile } = useProfile(userId);

  console.log("current Use r: ", currentUser);
  console.log("profile: ", profile);

  return (
    <>
      <div style={style.profileSection}>
        <ProfileHeader isMyProfile={isMyProfile} profile={profile?.profile} />
        <div style={style.calendarTodoDiary}>
          <div style={style.todoDiary}>
            <Todo
              isMyProfile={isMyProfile}
              schedules={profile?.schedules}
              selectedDay={selectedDay}
            />
            {isMyProfile && <Diary />}
          </div>
          <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
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
