import { useState } from "react";

export default function FandomCard({ logo, name }) {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <div style={style.fandomCard}>
            <div style={style.logoWrapper}>
                <img src={logo} alt={`${name}-logo`} style={style.fandomLogo} />
            </div>
            <p style={style.fandomName}>{name}</p>
            
            <button 
                style={{
                    ...style.followBtn, 
                    ...(isFollowing ? style.followBtnActive : {})
                }}
                onClick={() => setIsFollowing(!isFollowing)}
            >
                {isFollowing ? "팔로잉" : "팔로우"}
            </button>
        </div>
    );
}

const style = {
    
    fandomCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        border: '2px solid transparent',
        backgroundImage: `linear-gradient(var(--white)),
                            linear-gradient(to bottom, var(--outline-2-top) 2%, var(--outline-2-bottom) 98%)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        borderRadius: "15px",
        backgroundColor: "#var(--white)",
        boxSizing: "border-box",
    },
    logoWrapper: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "var(--white)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
        border: "1px solid var(--black)",
    },
    fandomLogo: {
        width: "100%", 
    },
    fandomName: {
        margin: "0 0 20px 0",
        fontSize: "18px",
        fontWeight: "bold",
        color: "var(--black)",
    },
    followBtn: {
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "30px",
        border: "none",
        padding: "10px 35px",
        color: "var(--white)",
        backgroundColor: "var(--button-3)",
        transition: "all 0.2s ease",
        cursor: "pointer",
    },
    followBtnActive: {
        color: "var(--gray-1)",
        backgroundColor: "var(--outline-3)",
    },
}