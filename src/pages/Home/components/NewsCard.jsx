import NewsImage from "../../../assets/news-image.svg";
import NewsImage1 from "../../../assets/news-image-1.png"
import NewsImage2 from "../../../assets/news-image-2.png"
import NewsImage3 from "../../../assets/news-image-3.png"
import NewsImage4 from "../../../assets/news-image-4.png"

export default function NewsCard({ limit }) {

    const newsData = [
        { id: 1, link: `https://www.starnewskorea.com/music/2026/06/19/2026061915150227652`, image: NewsImage1,title: `아일릿 모카, 활동 재중단 "불안 증세..건강 회복 전념"[공식]`, content: `아일릿 소속사 빌리프랩은 19일 공식 입장을 통해 "모카는 미니 4집 컴백 준비 과정부터 과도한 긴장감과 불안 증세로 인해 치료와 회복을 병행해 왔다"고 밝혔다. ...` },
        { id: 2, link: `https://www.starnewskorea.com/music/2026/06/19/2026061914473351232`, image: NewsImage2, title: "엔하이픈, 8월 21일 컴백 확정..뱀파이어 콘셉트 확장[공식]", content: `아이돌그룹 엔하이픈(ENHYPEN)이 오는 8월 21일 발매되는 미니 8집 'THE SIN : BLISS'를 통해 자신들만의 독창적인 뱀파이어 콘셉트를 확장한다.엔하이픈(정원 제이 제이크 성훈 선우 니키)은 19일 오후 스포티파이와 아이튠즈에서 미니 8집의 '사전 저장'(Pre-save) 페이지를 오픈하고 신보 발매 소식을 알렸다. '사전 저장' 화면에 따르면 'THE SIN : BLISS'에는 6개의 노래가 수록된다. ...` },
        { id: 3, link: `https://www.starnewskorea.com/music/2026/06/20/2026062007333184421`, image: NewsImage3, title: "방탄소년단 'Come Over', 전 세계 차트 호령", content: `그룹 방탄소년단(BTS)이 신곡 'Come Over'로 전 세계 차트를 흔들고 있다.20일 발표된 영국 오피셜 차트(6월 19일~6월 25일 자)에 따르면 방탄소년단의 신곡 'Come Over'가 '오피셜 싱글 톱 100' 52위로 진입했다.  ...` },
        { id: 4, link: `https://www.starnewskorea.com/music/2026/06/20/2026062008121224664`, image: NewsImage4, title: "방탄소년단 진, 마이원픽 K-POP 개인 부문 120주 연속 1위", content: `방탄소년단(BTS) 진은 마이원픽(MY1PICK) K-POP 개인 부문 주간랭킹에서 120주 연속 1위를 기록하며 인기를 빛냈다.진은 6월 2주차 투표에서 749만5075표를 얻어 정상에 오르며 주간랭킹 연속 1위 기록을 이어갔다. ...` }
    ];

    const displayData = limit ? newsData.slice(0, limit) : newsData;

    return (
        <div style={style.newsCardBox}>
            {displayData.map((card) => (
                <a href={card.link} key={card.id} style={style.newsLink}>
                    <div className="box" style={style.newsCard}>
                        <img src={card.image} alt="news-image" style={style.newsCardImg} />
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
        height: "350px", 
    },
    newsCardImg: {
        width: "100%",
        borderRadius: "15px",
        objectFit: "cover",  
        objectPosition: "center",
        height:"160px"
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