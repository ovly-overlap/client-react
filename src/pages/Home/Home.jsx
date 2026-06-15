import "./Home.css";
import NewsContainer from "./components/NewsContainer.jsx"
import MissionContainer from "./components/MissionContainer.jsx"
import ScheduleSection from "./components/ScheduleSection.jsx";
import NewsCard from "../Home/components/NewsCard.jsx"
import NewsIcon from "../../assets/news-icon.svg";
import MiniLogo from "../../assets/mini-logo.svg";
import CalendarIcon from "../../assets/calendar-icon.svg";
import CheckIcon from "../../assets/check-icon.svg";
import AlarmIcon from "../../assets/alarm-icon.svg";

export default function Home(){
    return(
        <>
        <div style={style.homeSection}>
            <div style={style.home}>
                <div style={style.headerContainer} className="header-container">
                    <div className='header'>
                        <div className="header-hello">
                            <p className="mention">안녕하세요, USER님!</p>
                            <img src={MiniLogo} alt="logo"/>
                        </div>
                        <p className="sub-mention">오늘도 당신의 아티스트를 응원해 보세요.</p>
                    </div>
                    <div className="alarm-button">
                        <button style={style.alarmBtn}><img src={AlarmIcon}/></button>
                    </div>
                </div>
            
                <div className="schedule-mission">
                    <ScheduleSection/>
                    <MissionContainer/>
                </div> 
                <NewsContainer/>
            </div>
        </div>
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
    alarmBtn: {
        border:"none",
        backgroundColor:"transparent",
        color:"var(--gray-2)"
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "60px"
    },
}