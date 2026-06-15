import NewsImage from "../../../assets/news-image.svg";

export default function NewsCard({ limit }) {

    const newsData = [
        { id: 1, title: "기사 제목 기사 제목 기사 제목 기사 제목", content: "케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ..." },
        { id: 2, title: "기사 제목", content: "케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ..." },
        { id: 3, title: "기사 제목", content: "케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ..." },
        { id: 4, title: "기사 제목", content: "케이팝의 새로운 공식을 예고한 그룹 알파드라이브원(ALPHA DRIVE ONE)이 오늘(12일) 데뷔하며 가요계에 알람을 울렸다.12일 오후 서울 ..." }
    ];

    const displayData = limit ? newsData.slice(0, limit) : newsData;

    return (
        <div style={style.newsCardBox}>
            {/* 💡 newsData 대신 잘라낸 displayData로 map을 돌립니다 */}
            {displayData.map((card) => (
                <a href="#" key={card.id} style={style.newsLink}>
                    <div className="box" style={style.newsCard}>
                        <img src={NewsImage} alt="news-image" style={style.newsCardImg} />
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
        textDecoration: 'none', 
        color: 'inherit'
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