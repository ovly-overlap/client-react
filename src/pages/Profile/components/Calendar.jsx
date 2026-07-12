import React, { useState } from "react";
import "./Calendar.css";
import CalendarImg1 from "../../../assets/BTS-Logo.png";
import CalendarImg2 from "../../../assets/BTS-Logo.png";
import ArrowIcon from "../../../assets/left-arrow-icon.svg";

export default function Calendar({ selectedDay, setSelectedDay }) {
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const today = new Date();

    // 이전 달 / 다음 달 이동 함수
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0(일) ~ 6(토)
    const totalDaysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
    const emptyCellsCount = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const eventDays = [
        // { year: 2026, month: 0, day: 10, img: CalendarImg1 }, 
        // { year: 2026, month: 0, day: 21, img: CalendarImg1 }, 
        // { year: 2026, month: 5, day: 17, img: CalendarImg2 }, 
    ];

    return (
        <div className="calendar-wrapper">
            <div className="calendar-control-header">
                <button className="arrow-btn" onClick={handlePrevMonth}>
                    <img src={ArrowIcon} alt="이전 달" className="arrow-svg" />
                </button>

                <span className="year-month-text">{`${currentYear}년 ${currentMonth + 1}월`}</span>

                <button className="arrow-btn" onClick={handleNextMonth}>
                    <img
                        src={ArrowIcon}
                        alt="다음 달"
                        className="arrow-svg next"
                    />
                </button>
            </div>

            <div className="ovly-calendar-card">
                <div className="calendar-main-box">
                    <div className="calendar-weekday-header">
                        {weekdays.map((day, index) => (
                            <div
                                key={day}
                                className={`weekday ${index === 5 ? "sat" : index === 6 ? "sun" : ""}`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="calendar-days-grid">
                        {[...Array(emptyCellsCount)].map((_, i) => (
                            <div key={`empty-${i}`} className="day-cell">
                                <span className="day-text"></span>
                            </div>
                        ))}

                        {[...Array(totalDaysInMonth)].map((_, i) => {
                            const dayNumber = i + 1;

                            const dayOfWeek = new Date(
                                currentYear,
                                currentMonth,
                                dayNumber
                            ).getDay();
                            const isSat = dayOfWeek === 6;
                            const isSun = dayOfWeek === 0;

                            const isToday =
                                today.getFullYear() === currentYear &&
                                today.getMonth() === currentMonth &&
                                today.getDate() === dayNumber;

                            const matchedEvent = eventDays.find(
                                (event) =>
                                    event.year === currentYear &&
                                    event.month === currentMonth &&
                                    event.day === dayNumber
                            );

                            const hasBgImage = !!matchedEvent;

                            return (
                                <div
                                    key={`day-${dayNumber}`}
                                    onClick={() =>
                                        setSelectedDay({
                                            year: currentYear,
                                            month: currentMonth,
                                            day: dayNumber,
                                        })
                                    }
                                    className={`day-cell
                                    ${isSat ? "sat" : ""} ${isSun ? "sun" : ""}
                                    ${isToday ? "highlighted-day" : ""}
                                    ${
                                        selectedDay?.year === currentYear &&
                                        selectedDay?.month === currentMonth &&
                                        selectedDay?.day === dayNumber
                                            ? "selected-day"
                                            : ""
                                    }`}
                                    style={
                                        hasBgImage
                                            ? {
                                                backgroundImage: `url(${matchedEvent.img})`,
                                                backgroundColor: "transparent",
                                                }
                                            : {}
                                    }
                                >
                                    <span className="day-text">{dayNumber}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}