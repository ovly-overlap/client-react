import { Link } from "react-router-dom";
import NewsIcon from "../../../assets/news-icon.svg";
import NewsCard from "./NewsCard.jsx";

export default function NewsContainer() {

    return (
    <div className="news-container">
        <div style={styles.newsHeader}>
            <img src={NewsIcon} alt="news-icon" />
            <p className="title">실시간 뉴스</p>
        </div>
        <div style={styles.newsBox}>
            <Link to="/idol-news" style={styles.newsBoxButton}>
                    모두보기
            </Link>
            <NewsCard />
        </div>
    </div>
    );
}

const styles = {
    newsHeader: {
        display: "flex",
        gap: "15px",
        alignItems: "center",
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