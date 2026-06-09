import CheckIcon from "../../../assets/check-icon.svg";
export default function MissionContainer(){
    return(
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
        </div> 
    )
}