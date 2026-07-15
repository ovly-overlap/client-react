import { useState } from "react";
import CalendarIcon from "../../../assets/calendar-icon.svg"; 
import { getCurrentUser } from "../../../utils/localStorage.js"; 

const toDateValue = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const parseDateValue = (dateValue) => {
    if (!dateValue) return new Date();
    const [year, month, day] = dateValue.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const getCurrentScheduleDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const currentDayOfWeek = today.getDay();
    
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToSubtract);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(monday);
        nextDay.setDate(monday.getDate() + i);
        weekDays.push({
            dateValue: toDateValue(nextDay),
            day: nextDay.getDate(),
        });
    }

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
        currentYearMonth: `${year}년 ${month}월`,
        weekDays,
        todayDate: toDateValue(today),
        weekStart: toDateValue(monday),
        weekEnd: toDateValue(sunday),
    };
};

export default function ScheduleSection(){
    const [{ currentYearMonth, weekDays, todayDate, weekStart, weekEnd }] = useState(getCurrentScheduleDates);
    const [selectedDate, setSelectedDate] = useState(todayDate);
    const currentUser = getCurrentUser();
    
    const scheduleData = (currentUser?.todos ?? [])
        .filter((todo) => todo.createdAt && todo.createdAt >= weekStart && todo.createdAt <= weekEnd)
        .map((todo) => ({
            id: todo.id,
            date: todo.createdAt, 
            day: parseDateValue(todo.createdAt).getDate(), 
            title: todo.label,
            memo: todo.memo || '프로필 해야 할 일',
        }));

    const filteredSchedules = scheduleData.filter(item => item.date === selectedDate);
    const hasSchedule = (dateValue) => scheduleData.some(item => item.date === dateValue);

    return(
        <>
        <div className="schedule">
            <div className="schedule-header">
                <img src={CalendarIcon} alt="profile-image"/>
                <p className="title">다가오는 일정</p>
            </div>
            <div className="schedule-content">
                <div className="schedule-box">
                    <div className='schedule-box-weekLabel'>
                        <p>{currentYearMonth}</p>
                        <div className="schedule-box-content">
                            <div className="schedule-box-calender">
                                {weekDays.map((dayItem, index) => {
                                    const isScheduled = hasSchedule(dayItem.dateValue);
                                    const isSelected = selectedDate === dayItem.dateValue;
                                    return (
                                        <div 
                                            key={index} 
                                            className={`day ${isScheduled ? 'has-event' : ''} ${isSelected ? 'active' : ''}`}
                                            onClick={() => setSelectedDate(dayItem.dateValue)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <p>{dayItem.day}</p>
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
                                    <div className="schedule-date-badge">{schedule.day}</div>
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
                    overflow: hidden; 
                }
                .title{
                    font-weight: bold;
                    font-size:24px;
                }
                .schedule-box{
                    display: flex;
                    flex-direction: column;
                    background-color: var(--white);
                    border: 3px solid var(--outline-3);
                    border-radius: 15px;
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
                    border: 3px solid #A6B2F8;
                    background-color: #F0F2FF;
                }
                .schedule-box-calender .day.active p {
                    color: #A6B2F8;
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
        </>
    )
}
