import { useState } from "react";
import { createPortal } from "react-dom";
import NewsContainer from "./components/NewsContainer.jsx";
import MissionContainer from "./components/MissionContainer.jsx";
import ScheduleSection from "./components/ScheduleSection.jsx";
import NewsCard from "../Home/components/NewsCard.jsx";
import NewsIcon from "../../assets/news-icon.svg";
import MiniLogo from "../../assets/mini-logo.svg";
import CalendarIcon from "../../assets/calendar-icon.svg";
import CheckIcon from "../../assets/check-icon.svg";
import AlarmIcon from "../../assets/alarm-icon.svg";
import AlarmDropdown from "./components/AlarmDropdown.jsx";

export default function Home(){
    // 알람창 열림/닫힘 상태 관리
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);

    // 알람 버튼 클릭 핸들러
    const toggleAlarm = () => {
        setIsAlarmOpen((prev) => !prev);
    };

    return(
        <>
        <div style={style.homeSection}>
            <div style={style.home}>
                <div style={style.headerContainer}>
                    <div style={style.header}>
                        <div style={style.headerHello}>
                            <p style={style.Mention}>안녕하세요, USER님!</p>
                            <img src={MiniLogo} alt="logo"/>
                        </div>
                        <p style={style.subMention}>오늘도 당신의 아티스트를 응원해 보세요.</p>
                    </div>
                    <div style={style.alarmBtnDiv}>
                        {/* 클릭 이벤트 바인딩 */}
                        <button style={style.alarmBtn} onClick={toggleAlarm}>
                            <img src={AlarmIcon} alt="alarm"/>
                        </button>
                    </div>
                </div>
            
                <div style={style.scheduleMission}>
                    <ScheduleSection/>
                    <MissionContainer/>
                </div> 
                <NewsContainer/>
            </div>
        </div>

        {/* Portal을 사용해 body 바로 아래에 알람창 띄우기 */}
        {isAlarmOpen && createPortal(
            <AlarmDropdown onClose={() => setIsAlarmOpen(false)} />,
            document.body
        )}
        </>
    )
}

const style = {
    homeSection: {
        marginLeft: "240px"
    },
    home: {
        padding: "38px 60px 30px 60px"
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "60px"
    },
    header: {
        display: "flex",
        flexDirection: "column",
    },
    headerHello: {
        whiteSpace: "nowrap",
        display: "flex",
        gap:"20px",
    },
    Mention: {
        fontWeight: "bold",
        fontSize:"30px",
    },
    subMention: {
        color: "var(--gray-1)",
        fontSize: "16px",
        textAlign: "left",
    },
    scheduleMission : {
        display: "flex",
        gap:"51px",
        marginBottom: "48px",
    },
    alarmBtnDiv: {
        marginLeft: "auto",
        width: "45px",
    },
    alarmBtn: {
        border:"none",
        backgroundColor:"transparent",
        color:"var(--gray-2)"
    },
}