import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import prevIcon from "../../assets/prev-icon.svg"
import coloredHeartIcon from "../../assets/colored-heart-icon.svg"
import SearchBar from "../../components/SearchBar";
import btsLogo from "../../assets/BTS-Logo.png"
import FandomCard from "./components/FandomCard";

export default function FavGroupsPage() {
    const location = useLocation();
    
    const isMyProfile = location.state?.isMyProfile ?? true; 
    const userName = location.state?.userName ?? "나";

    const [isFandomExist, setIsFandomExist] = useState(true);

    return (
        <>
        <div style={style.favGroupSection}>
            <div style={style.favGroupCard}>
                <div style={style.favGroupHeader}>
                    <Link to={isMyProfile ? "/profile" : "/other-user-profile"} style={style.prevIconBtn}>
                        <img src={prevIcon} alt="prev-icon" style={style.prevIconImg} />
                    </Link>

                    <div style={style.titleWrapper}>
                        <img src={coloredHeartIcon} alt="heart-icon" style={style.heartIcon} />
                        <p style={style.title}>
                            {isMyProfile ? "나의 관심 팬덤" : `${userName}님의 관심 팬덤`}
                        </p>
                    </div>
                </div>

                {isMyProfile && <SearchBar placeholder={"팬덤 이름을 검색해보세요"}/>}  

                {isFandomExist ? (
                    <div style={style.fandomGrid}>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <FandomCard 
                                key={index} 
                                logo={btsLogo} 
                                name="BTS" 
                            />
                        ))}
                    </div>
                ) : (
                    <div style={style.emptyStateContainer}>
                        <p style={style.noScheduleMsg1}>
                            {isMyProfile ? "아직 관심 팬덤이 없어요!" : "아직 관심 팬덤이 없어요."}
                        </p>
                        {isMyProfile && (
                            <p style={style.noScheduleMsg2}>관심있는 팬덤을 검색해서 추가해보세요.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

const style = {
    favGroupSection: {
        margin : "45px 80px 45px 310px",
        display: "flex",
        flexDirection: "column",
        border: "3px solid var(--outline-3)",
        borderRadius: "17px",
        backgroundColor: "var(--white)",
        padding: "20px 15px",
        alignItems: "center"
    },
    favGroupCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap:"30px",
    },
    favGroupHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", 
        width: "100%",
        borderBottom: "2px solid var(--outline-3)", 
        paddingBottom: "20px",  
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
    }, titleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
    },
    heartIcon: {
        width: "30px",
    },
    title: {
        margin: 0,
        fontWeight: "bold",
        fontSize: "24px",
        lineHeight: 1,
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
        textAlign: "center",
    },

    fandomGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", // 반응형 그리드
        gap: "20px",
        width: "100%",
        padding: "0 30px 40px 30px", // 그리드 여백 추가
        boxSizing: "border-box",
    },
    emptyStateContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flex: 1, 
        marginTop: "100px",
    },
    noScheduleMsg1: {
        margin: "0 0 10px 0",
        fontWeight: "bold",
        fontSize: "18px",
        color: "var(--black)",
    },
    noScheduleMsg2: {
        margin: 0,
        fontSize: "14px",
        color: "var(--gray-1)",
    },
}