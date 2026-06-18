import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import prevIcon from "../../assets/prev-icon.svg"
import SearchBar from "../../components/SearchBar";
import TrendingNewsContainer from "./components/TrendingNewsContainer";
import { markMissionCompleted } from "../../utils/localStorage.js";


export default function IdolNews () {
    
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        markMissionCompleted("newsViewed");
    }, []);

    return (
        <>
        <div style={style.idolNewsSection}>
            <div style={style.idolNewsCard}>
                <div style={style.idolNewsHeader}>
                    <Link to="/" style={style.prevIconBtn}>
                        <img src={prevIcon} alt="prev-icon" style={style.prevIconImg} />
                    </Link>
                    <p style={style.title}>아이돌 뉴스</p>
                </div>

                <SearchBar 
                    placeholder="오늘의 관심사는 무엇인가요?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    containerStyle={{ marginBottom: "150px" }} 
                />

                <TrendingNewsContainer />
            </div>
        </div>
        </>
    )
}

const style = {
    idolNewsSection: {
        margin : "45px 80px 45px 310px",
        display: "flex",
        flexDirection: "column",
        border: "3px solid var(--outline-3)",
        borderRadius: "17px",
        backgroundColor: "var(--white)",
        padding: "15px 15px",
        alignItems: "center"
    },
    idolNewsCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    idolNewsHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", 
        width: "100%",
        borderBottom: "2px solid var(--outline-3)", 
        paddingBottom: "16px",  
        marginBottom: "20px",
    },
    prevIconBtn: {
        display: "flex", 
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: "5px",
    },
    prevIconImg: {
        width:"50px",
    },
    title: {
        fontWeight: "bold",
        fontSize: "24px",
    },
    searchBarContainer: {
        width: "100%",
        padding: "0 30px", 
        boxSizing: "border-box",
        marginBottom: "150px",
    },
    searchBar: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--outline-3)",
        borderRadius: "10px",  
        padding: "12px 16px",    
        width: "100%",
        boxSizing: "border-box",
    },
    searchInput: {
        border: "none",
        background: "none",
        outline: "none",  
        width: "100%",
        fontSize: "16px",
        color: "var(--black)",
    },
}
