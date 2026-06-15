import CalendarIcon from '../../../assets/calendar-icon.svg'
import { useState, useEffect } from 'react'

export default function ScheduleSection(){
    const [currentYearMonth, setCurrentYearMonth] = useState("");
    const [weekDays, setWeekDays] = useState([]);
    const [todayDate, setTodayDate] = useState(new Date().getDate());
    
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());

    const scheduleData = [
        { id: 1, date: 15, title: "지민 생카", memo: "오전 10:00 / 홍대카페" },
        { id: 2, date: 16, title: "앨범깡 방송 시청", memo: "오후 01:00 / 방구석에서" },
        { id: 3, date: 15, title: "굿즈 통판 입금", memo: "오후 06:00 / 은행 점검시간 피하기" },
        { id: 4, date: 17, title: "스포 라이브", memo: "오후 08:00 / 알림 켜두기" },
        { id: 5, date: 15, title: "투표 마감", memo: "오후 11:59 / 최애 어플 들어가서 하트 털기" },
        { id: 6, date: 18, title: "영등포 팬싸인회", memo: "오후 02:00 / 타임스퀘어 / 응원봉, 포카, 핫팩, 보조 배터리 챙기기" }
    ];

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; 
        setCurrentYearMonth(`${year}년 ${month}월`);

        const currentDayOfWeek = today.getDay(); 
        const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
        
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysToSubtract);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(monday);
            nextDay.setDate(monday.getDate() + i);
            days.push(nextDay.getDate());
        }
    
        setWeekDays(days);
        setTodayDate(today.getDate());
    }, []);

    const filteredSchedules = scheduleData.filter(item => item.date === selectedDate);
    const hasSchedule = (day) => scheduleData.some(item => item.date === day);

    return(
        <>
        <div className="schedule">
            <div className="schedule-header">
                <img src={CalendarIcon} alt="profile-image"/>
                <p className="title">다가오는 일정</p>
            </div>
            <div className="schedule-content">
                <div className="box schedule-box">
                    <div className='schedule-box-weekLabel'>
                        <p>{currentYearMonth}</p>
                        <div className="schedule-box-content">
                            <div className="schedule-box-calender">
                                {weekDays.map((day, index) => {
                                    const isScheduled = hasSchedule(day);
                                    const isSelected = selectedDate === day;

                                    return (
                                        <div 
                                            key={index} 
                                            className={`day ${isScheduled ? 'has-event' : ''} ${isSelected ? 'active' : ''}`}
                                            onClick={() => setSelectedDate(day)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <p>{day}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="schedule-list-container">
                        {filteredSchedules.length > 0 ? (
                            filteredSchedules.map((schedule) => (
                                <div key={schedule.id} className="schedule-item">
                                    <div className="schedule-date-badge">{schedule.date}</div>
                                    <div className="schedule-info">
                                        <h4>{schedule.title}</h4>
                                        <p>{schedule.memo}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-schedule-message">
                                <p className="no-schedule-message-1">다가오는 일정이 아직 없어요.</p>
                                <p className="no-schedule-message-2">새로운 일정이 생기면 여기에 표시됩니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .schedule{
                    display: flex;
                    flex-direction: column;
                    gap:20px;
                }
                .schedule-header{
                    display: flex;
                    gap : 15px;
                    align-items: center;
                }
                .schedule-box{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    gap:30px;
                    padding: 30px 25px 30px 25px;
                    box-sizing: border-box;
                }
                .schedule-box p{
                    text-align: left;
                    font-size: 20px;
                    font-weight: bold;
                }
                .schedule-box-weekLabel{
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .schedule-box-calender{
                    display: flex;
                    gap:16px;
                }
                .schedule-box-calender .day{
                    height: 90px;
                    width: 80px;
                    border-radius: 15px;
                    padding:11px;
                    border: 3px solid var(--gray-2);
                    background-color: var(--gray-3);
                    box-sizing: border-box;
                    transition: all 0.2s;
                }
                .schedule-box-calender .day p{
                    font-size: 16px;
                    color:var(--gray-2);
                }
                
                .schedule-box-calender .day.has-event {
                    border: 3px solid transparent;
                    background-image:   linear-gradient(var(--nav-2), var(--nav-2)), 
                                        linear-gradient(to bottom, var(--outline-2-top), var(--outline-2-bottom));
                    background-origin: border-box;
                    background-clip: padding-box, border-box;
                }
                .schedule-box-calender .day.has-event p {
                    background: linear-gradient(to bottom,  var(--outline-2-top), var(--outline-2-bottom));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .schedule-box-calender .day.active {
                    border: 3px solid #5C62F7;
                    background-color: #F0F2FF;
                }
                .schedule-box-calender .day.active p {
                    color: #5C62F7;
                }

                .schedule-list-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    max-height: 280px;
                    overflow-y: auto;
                    padding-right: 5px;
                }
                .schedule-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .schedule-date-badge {
                    width: 45px;
                    height: 45px;
                    background: linear-gradient(to bottom,  var(--outline-2-top), var(--outline-2-bottom));
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                }
                .schedule-info {
                    text-align: left;
                }
                .schedule-info h4 {
                    margin: 0 0 4px 0;
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--black);
                }
                .schedule-info p {
                    margin: 0;
                    font-size: 14px;
                    font-weight: normal;
                    color: var(--gray-2);
                }

                .no-schedule-message{
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    padding: 30px 0 30px 0;
                }
                .no-schedule-message .no-schedule-message-1{
                    font-size: 20px;
                }
                .no-schedule-message .no-schedule-message-2{
                    font-size: 16px;
                    font-weight: 400;
                    color:var(--gray-2);
                }
            `}</style>
        </div> 
        </>
    )
}