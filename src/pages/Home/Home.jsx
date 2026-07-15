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
import alarmFillIcon from "../../assets/alarm-fill-icon.svg";
import AlarmDropdown from "./components/AlarmDropdown.jsx";
import { useOutletContext } from "react-router-dom";

const initialAlarmData = [];

export default function Home() {
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [alarms, setAlarms] = useState(initialAlarmData);
    const hasUnread = alarms.some((item) => item.isUnread);
    const user = useOutletContext();
    console.log(user);

    const toggleAlarm = () => {
        setIsAlarmOpen((prev) => !prev);
    };
    const handleReadAll = () => {
        setAlarms((prevAlarms) =>
            prevAlarms.map((item) => ({ ...item, isUnread: false }))
        );
    };
    const handleReadItem = (id) => {
        setAlarms((prevAlarms) =>
            prevAlarms.map((item) =>
                item.id === id ? { ...item, isUnread: false } : item
            )
        );
    };

    return (
        <>
            <div style={style.homeSection}>
                <div style={style.home}>
                    <div style={style.headerContainer}>
                        <div style={style.header}>
                            <div style={style.headerHello}>
                                <p style={style.Mention}>
                                    안녕하세요, {user?.username}님!
                                </p>
                                <img src={MiniLogo} alt="logo" />
                            </div>
                            <p style={style.subMention}>
                                오늘도 당신의 아티스트를 응원해 보세요.
                            </p>
                        </div>
                        <div style={style.alarmBtnDiv}>
                            <button
                                style={style.alarmBtn}
                                onClick={toggleAlarm}
                            >
                                <img
                                    src={hasUnread ? alarmFillIcon : AlarmIcon}
                                    alt="alarm"
                                />
                            </button>
                        </div>
                    </div>

                    <div style={style.scheduleMission}>
                        <ScheduleSection />
                        <MissionContainer />
                    </div>
                    <NewsContainer />
                </div>
            </div>

            {isAlarmOpen &&
                createPortal(
                    <AlarmDropdown
                        alarms={alarms}
                        onReadAll={handleReadAll}
                        onReadItem={handleReadItem}
                        onClose={() => setIsAlarmOpen(false)}
                    />,
                    document.body
                )}
        </>
    );
}

const style = {
    homeSection: {
        marginLeft: "240px",
    },
    home: {
        padding: "38px 60px 30px 60px",
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "60px",
    },
    header: {
        display: "flex",
        flexDirection: "column",
    },
    headerHello: {
        whiteSpace: "nowrap",
        display: "flex",
        gap: "20px",
    },
    Mention: {
        fontWeight: "bold",
        fontSize: "30px",
    },
    subMention: {
        color: "var(--gray-1)",
        fontSize: "16px",
        textAlign: "left",
    },
    scheduleMission: {
        display: "flex",
        gap: "51px",
        marginBottom: "48px",
    },
    alarmBtnDiv: {
        marginLeft: "auto",
        width: "45px",
    },
    alarmBtn: {
        border: "none",
        backgroundColor: "transparent",
        color: "var(--gray-2)",
    },
};
