import "./Home.css";
import NewsImage from "../assets/news-image.svg";
import NewsIcon from "../assets/news-icon.svg";
import MiniLogo from "../assets/mini-logo.svg";
import CalendarIcon from "../assets/calendar-icon.svg";
import CheckIcon from "../assets/check-icon.svg";
import AlarmIcon from "../assets/alarm-icon.svg";
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
                    <div className="schedule">
                        <div className="schedule-header">
                            <img src={CalendarIcon} alt="profile-image"/>
                            <p className="title">다가오는 일정</p>
                        </div>
                        <div className="schedule-content">
                            <div className="box schedule-box">
                                <div>
                                    <p>2026년 1월</p>
                                    <div className="schedule-box-content">
                                        <button>모두보기</button>
                                        <div className="schedule-box-calender">
                                            <div className="day"><p>11</p></div>
                                            <div className="day"><p>12</p></div>
                                            <div className="day"><p>13</p></div>
                                            <div className="day"><p>14</p></div>
                                            <div className="day"><p>15</p></div>
                                            <div className="day"><p>16</p></div>
                                            <div className="day"><p>17</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="no-schedule-message">
                                    <p className="no-schedule-message-1">다가오는 일정이 아직 없어요.</p>
                                    <p className="no-schedule-message-2">새로운 일정이 생기면 여기에 표시됩니다.</p>
                                </div>
                            </div>
                        </div>
                    </div> {/* schedule */}
                    <div className="mission-container">
                        <div className="mission">
                            <div className="schedule-header">
                                <img src={CheckIcon} alt="check-icon"/>
                                <p className="title">오늘의 미션</p>
                            </div>
                            <div className="box mission-box">
                                <div className="mission-box-content">
                                    <div className="todo">
                                        <input type="checkbox" id="mission-1" className="mission-check" disabled/>
                                        <label htmlFor="mission-1" className="mission-label">아티스트 스케줄 추가하기</label>
                                    </div>
                                    <div className="todo">
                                        <input type="checkbox" id="mission-2" className="mission-check" disabled/>
                                        <label htmlFor="mission-2" className="mission-label">뉴스 시청하기</label>
                                    </div>
                                    <div className="todo">
                                        <input type="checkbox" id="mission-3" className="mission-check" disabled/>
                                        <label htmlFor="mission-3" className="mission-label">오늘의 일기 작성하기</label>
                                    </div>
                                    <div className="todo">
                                        <input type="checkbox" id="mission-4" className="mission-check" disabled/>
                                        <label htmlFor="mission-4" className="mission-label">친구 팔로우하기</label>
                                    </div>
                                    <div className="todo">
                                        <input type="checkbox" id="mission-5" className="mission-check" disabled/>
                                        <label htmlFor="mission-5" className="mission-label">게시물에 댓글 남기기</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> {/* mission-container */}
                </div> {/* schedule-mission */}
                <div className="news-container">
                    <div className="news-header">
                        <img src={NewsIcon} alt="news-icon" />
                        <p className="title">실시간 뉴스</p>
                    </div>
                    <div className="news-box">
                        <button>모두보기</button>
                        <div className="news-card-box">
                            <div className="box news-card">
                                <img src={NewsImage} alt="news-image" />
                            </div>
                            <div className="box news-card">
                                <img src={NewsImage} alt="news-image" />
                            </div>
                            <div className="box news-card">
                                <img src={NewsImage} alt="news-image" />
                            </div>
                            <div className="box news-card">
                                <img src={NewsImage} alt="news-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Home