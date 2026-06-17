import CheckIcon from "../../../assets/check-icon.svg";
import CheckboxCheckIcon from "../../../assets/checkbox-check-icon.svg"

export default function MissionContainer() {

    const missions = [
        { id: 1, mission: "아티스트 스케줄 추가하기", isCompleted: false },
        { id: 2, mission: "뉴스 시청하기", isCompleted: false },
        { id: 3, mission: "오늘의 일기 작성하기", isCompleted: false },
        { id: 4, mission: "친구 팔로우하기", isCompleted: true }, 
        { id: 5, mission: "게시물에 댓글 남기기", isCompleted: false },
    ];

    return (
        <div style={styles.missionContainer}>
            <div style={styles.mission}>
                <div className="schedule-header">
                    <img src={CheckIcon} alt="check-icon" />
                    <p style={styles.title}>오늘의 미션</p>
                </div>
                <div style={styles.missionBox}>
                    <div style={styles.missionBoxContent}>
                        {missions.map((item) => (
                            <div key={item.id} style={styles.todo}>
                                <input 
                                    type="checkbox" 
                                    id={`mission-${item.id}`} 
                                    style={styles.missionCheck} 
                                    checked={item.isCompleted}
                                    disabled 
                                />
                                <div style={styles.customCheck}>
                                    {item.isCompleted && <img src={CheckboxCheckIcon}/>}
                                </div>
                                <label 
                                    htmlFor={`mission-${item.id}`} 
                                    style={{
                                        ...styles.missionLabel,
                                        ...(item.isCompleted ? styles.completedLabel : {})
                                    }}
                                >
                                    {item.mission}
                                </label>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
const styles = {
    missionContainer: {
        flex: 1,
    },
    mission: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    title: {
        fontWeight: "bold",
        fontSize:"24px",
    },
    missionBox: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--white)",
        border: "3px solid var(--outline-3)",
        borderRadius: "15px",
        padding: "28px 25px",
    },
    missionBoxContent: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    todo: {
        borderRadius: "20px",
        border: "2px solid #EFF3F4",
        padding: "12px 15px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },
    missionCheck: {
        display: "none",
    },
    customCheck: {
        width: "18px",
        height: "18px",
        border: '2px solid transparent',
        backgroundImage:   `linear-gradient(var(--white)), 
                            linear-gradient(to bottom, var(--outline-2-top), var(--outline-2-bottom))`,
        backgroundOrigin: 'border-box',
        backgroundClip: `padding-box, border-box`,
        borderRadius: "3px",    
        backgroundColor: "var(--white)",
        flexShrink: 0, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    missionLabel: {
        fontSize: "16px",
        fontWeight: "500",
        color: "var(--black)",
        cursor: "pointer",
        textDecoration: "none",
    },
    completedLabel: {
        color: "var(--gray-1)",    
        textDecoration: "line-through", 
    }
};
