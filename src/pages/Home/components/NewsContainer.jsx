import NewsIcon from "../../../assets/news-icon.svg";
import NewsCard from "./NewsCard.jsx";
export default function NewsContainer(){
    return(
        <div className="news-container">
            <div className="news-header">
                <img src={NewsIcon} alt="news-icon" />
                <p className="title">실시간 뉴스</p>
            </div>
            <div className="news-box">
                <button>모두보기</button>
                <NewsCard/>
            </div>
        </div>
    )
}