import { Link } from "react-router-dom";
import NewsIcon from "../../../assets/news-icon.svg";
import NewsCard from "./NewsCard.jsx";
import { markMissionCompleted } from "../../../utils/localStorage.js";

export default function NewsContainer() {

    return (
    <div className="news-container">
        <div style={style.newsHeader}>
            <img src={NewsIcon} alt="news-icon" />
            <p style={style.title}>실시간 뉴스</p>
        </div>
        <div style={style.newsBox}>
            <Link
                to="/idol-news"
                style={style.newsBoxButton}
                onClick={() => markMissionCompleted("newsViewed")}
            >
                    모두보기
            </Link>
            <NewsCard />
        </div>
    </div>
    );
}

const style = {
    newsHeader: {
        display: "flex",
        gap: "15px",
        alignItems: "center",
        overflow: "hidden",
    },
    title: {
        fontWeight: "bold",
        fontSize:"24px",
    },
    newsBox: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    newsBoxButton: {
        color: "var(--gray-2)",
        textDecoration : "none",
        fontSize: "20px",
        marginLeft: "auto",
    },
};
