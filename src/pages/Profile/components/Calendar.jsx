import React from 'react';
import './Calendar.css';
import CalendarImg from "../../../assets/BTS-Logo.png";
import ArrowIcon from "../../../assets/left-arrow-icon.svg";

const Calendar = () => {
  return (
    // 🎯 흰색 카드 전체를 밖에서 한 번 더 감싸주는 투명한 컨테이너입니다.
    <div className="calendar-wrapper">
      
      {/* ➡️ [위치 이동] 흰색 카드(.ovly-calendar-card) 바깥쪽 위로 헤더를 뺐습니다! */}
      <div className="calendar-control-header">
        <button className="arrow-btn">
          <img src={ArrowIcon} alt="이전 달" className="arrow-svg" />
        </button>
        
        <span className="year-month-text">2026년 1월</span>
        
        <button className="arrow-btn">
          <img src={ArrowIcon} alt="다음 달" className="arrow-svg next" />
        </button>
      </div>

      {/* ⬇️ 순수한 요일과 날짜만 담기는 흰색 테두리 카드 박스 */}
      <div className="ovly-calendar-card">
        <div className="calendar-main-box">
          
          <div className="calendar-weekday-header">
            <div className="weekday">월</div>
            <div className="weekday">화</div>
            <div className="weekday">수</div>
            <div className="weekday">목</div>
            <div className="weekday">금</div>
            <div className="weekday sat">토</div>
            <div className="weekday sun">일</div>
          </div>

          <div className="calendar-days-grid">
            <div className="day-cell empty"></div>
            <div className="day-cell empty"></div>
            <div className="day-cell empty"></div>

            <div className="day-cell"><span className="day-text">1</span></div>
            <div className="day-cell"><span className="day-text">2</span></div>
            <div className="day-cell sat"><span className="day-text">3</span></div>
            <div className="day-cell sun"><span className="day-text">4</span></div>
            <div className="day-cell"><span className="day-text">5</span></div>
            <div className="day-cell"><span className="day-text">6</span></div>
            <div className="day-cell"><span className="day-text">7</span></div>
            <div className="day-cell"><span className="day-text">8</span></div>
            <div className="day-cell"><span className="day-text">9</span></div>

            <div 
              className="day-cell has-bg-image" 
              style={{ backgroundImage: `url(${CalendarImg})` }}
            >
              <span className="day-text">10</span>
            </div>

            <div className="day-cell sun highlighted-day">
              <span className="day-text">11</span>
            </div>

            <div className="day-cell"><span className="day-text">12</span></div>
            <div className="day-cell"><span className="day-text">13</span></div>
            <div className="day-cell"><span className="day-text">14</span></div>
            <div className="day-cell"><span className="day-text">15</span></div>
            <div className="day-cell"><span className="day-text">16</span></div>
            <div className="day-cell sat"><span className="day-text">17</span></div>
            <div className="day-cell sun"><span className="day-text">18</span></div>
            <div className="day-cell"><span className="day-text">19</span></div>
            <div className="day-cell"><span className="day-text">20</span></div>

            <div 
              className="day-cell has-bg-image" 
              style={{ backgroundImage: `url(${CalendarImg})` }}
            >
              <span className="day-text">21</span>
            </div>

            <div className="day-cell"><span className="day-text">22</span></div>
            <div className="day-cell"><span className="day-text">23</span></div>
            <div className="day-cell sat"><span className="day-text">24</span></div>
            <div className="day-cell sun"><span className="day-text">25</span></div>
            <div className="day-cell"><span className="day-text">26</span></div>
            <div className="day-cell"><span className="day-text">27</span></div>
            <div className="day-cell"><span className="day-text">28</span></div>
            <div className="day-cell"><span className="day-text">29</span></div>
            <div className="day-cell"><span className="day-text">30</span></div>
            <div className="day-cell sat"><span className="day-text">31</span></div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Calendar;