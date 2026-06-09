import CalendarIcon from '../../../assets/calendar-icon.svg'
export default function ScheduleSection(){
    return(
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
                    </div> 
    )
}