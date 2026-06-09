import NewsImage from "../../../assets/news-image.svg";
export default function NewsCard(){
    return(
        <div className="news-card-box">
            <div className="box news-card">
                <img src={NewsImage} alt="news-image" />
                <div className="news-card-text">
                    <h3>기사 제목</h3>
                    <p>
                        케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ...
                    </p>
                </div>
            </div>
            <div className="box news-card">
                <img src={NewsImage} alt="news-image" />
                <div className="news-card-text">
                    <h3>기사 제목</h3>
                    <p>케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ...</p>
                </div>
            </div>
            <div className="box news-card">
                <img src={NewsImage} alt="news-image" />
                <div className="news-card-text">
                    <h3>기사 제목</h3>
                    <p>케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ...</p>
                </div>
            </div>
            <div className="box news-card">
                <img src={NewsImage} alt="news-image" />
                <div className="news-card-text">
                    <h3>기사 제목</h3>
                    <p>케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ...</p>
                </div>
            </div>
        </div>
    )
}