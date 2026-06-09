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
function Home(){
    return(
        <>
        <div className='home-section'>
            <div className="home">
                <div className="header-container">
                    <div className='header'>
                        <div className="header-hello">
                            <p className="mention">안녕하세요, OOO님!</p>
                            <img src={MiniLogo} alt="logo"/>
                        </div>
                        <p className="sub-mention">오늘도 당신의 아티스트를 응원해 보세요.</p>
                    </div>
                    <div className="alarm-button"><button><img src={AlarmIcon}/></button></div>
                </div>
            
                <div className="schedule-mission">
                    <ScheduleSection/>
                    <MissionContainer/>
                </div> {/* schedule-mission */}
                <NewsContainer/>
            </div>
        </div>
        </>
    )
}
export default Home