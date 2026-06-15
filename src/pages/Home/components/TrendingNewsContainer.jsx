import upwardArrowIcon from "../../../assets/upward-arrow-icon.svg"
import NewsCard from "./NewsCard"

export default function TrendingNewsContainer() {
    return (
        <>
        <div style={style.trendingNews}>
            <div style={style.trendingNewsHeader}>
                <img src={upwardArrowIcon} alt="upward-icon" />
                <p style={style.trendingNewsLabel}>지금 인기있는 뉴스</p>
            </div>
            <NewsCard limit={3}/>
        </div>
        </>
    )
}

const style = {
    trendingNews: {
        display: "flex",
        flexDirection: "column",
        gap:"15px",
    },
    trendingNewsHeader: {
        display: "flex",
        flexDirection: "row",
        gap: "10px"
    },
    trendingNewsLabel: {
        fontSize: "20px",
        fontWeight: "bold",
    }
}