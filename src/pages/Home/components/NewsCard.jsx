import NewsImage from "../../../assets/news-image.svg";
import { useState, useEffect } from "react";
import { api } from "../../../api/axios";

export default function NewsCard({ limit, keyword = null }) {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let res;
                if (keyword) {
                    res = await api.get(`/news/search?keyword=${keyword}`);
                } else {
                    res = await api.get(`/news?limit=${limit}`);
                }

                console.log(res.data);
                setNewsData(res.data.items);
            } catch (err) {
                console.error("뉴스 데이터를 가져오는 중 에러 발생:", err);
            }
        };

        fetchNews();
    }, [limit, keyword]);

    return (
        <div style={style.newsCardBox}>
            {/* 💡 newsData 대신 잘라낸 displayData로 map을 돌립니다 */}
            {newsData.map((card) => (
                <a href={card.url} key={card.id} style={style.newsLink}>
                    <div className="box" style={style.newsCard}>
                        <img
                            src={card.image_url}
                            alt="news-image"
                            style={style.newsCardImg}
                        />
                        <div>
                            <h3 style={style.newsCardTextH3}>{card.title}</h3>
                            <p style={style.newsCardTextP}>{card.content}</p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}

const style = {
    newsCardBox: {
        display: "flex",
        flexWrap: "wrap",
        gap: "18px",
    },
    newsLink: {
        textDecoration: "none",
        color: "inherit",
    },
    newsCard: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--white)",
        border: "3px solid #EFF3F4",
        borderRadius: "15px",
        flex: "1 1 250px",
        maxWidth: "280px",
        padding: "15px",
    },
    newsCardImg: {
        width: "100%",
        height: "160px", // ⭕ 이미지 높이를 정적으로 고정 (원하는 높이로 조절 가능)
        objectFit: "cover", // ⭕ 중요: 이미지 비율을 유지하면서 영역을 꽉 채움 (찌러짐 방지)
        objectPosition: "center", // 이미지의 중앙이 보이도록 정렬
        borderRadius: "15px",
    },
    newsCardTextH3: {
        fontWeight: "bold",
        fontSize: "20px",
        margin: "15px 0px 10px 0px",
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    newsCardTextP: {
        margin: "0",
        textAlign: "left",
        fontSize: "16px",
        wordBreak: "break-word",
        lineHeight: "1.4",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
};
