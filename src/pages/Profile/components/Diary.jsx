import { useState } from "react";
import { getCurrentUser, getTodayKey, markMissionCompleted, updateCurrentUser } from "../../../utils/localStorage.js";
import DiaryIcon from "../../../assets/diray-icon.svg";
import DummyPost from "../../../assets/dummy-post.png";

export default function Diary() {
    const currentUser = getCurrentUser();
    const todayKey = getTodayKey();
    const todayDiary = currentUser?.diaries?.find((diary) => diary.date === todayKey);
    const [diaryText, setDiaryText] = useState(todayDiary?.text ?? "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]); // 업로드된 이미지 URL 리스트 관리

    const handleImageUpload = () => {
        const dummyImageUrl = DummyPost;
        setImages([...images, dummyImageUrl]);
    };

    const handleImageDelete = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleSave = () => {
        const trimmedText = diaryText.trim();
        if (!trimmedText || !currentUser) {
            alert("오늘의 일기를 입력해주세요.");
            return;
        }
        const nextDiaries = [
            ...(currentUser.diaries ?? []).filter((diary) => diary.date !== todayKey),
            {
                id: todayKey,
                date: todayKey,
                text: trimmedText,
            },
        ];

        updateCurrentUser({ diaries: nextDiaries });
        markMissionCompleted("diaryWritten");
        setDiaryText(trimmedText);
        alert("오늘의 일기가 저장되었습니다.");
        setIsModalOpen(false);
    };

    return (
        <div style={style.diarySection}>
            <span style={style.title}>오늘의 일기</span>
            <div style={style.diaryCard}>
                <div style={style.noDiaryContent}>
                    <div style={style.noDiaryIconMention}>
                        <img src={DiaryIcon} alt="diary-icon" style={style.diaryImage}/>
                        <div style={style.mentions}>
                            <p style={style.noDiaryMention}>일기를 작성해보세요!</p>
                            <p style={style.noDiarySubmMention}>잊고 싶지 않은 순간이 있지 않나요?</p>
                        </div>
                    </div>
                    <button type='button' style={style.writeDiaryButton} onClick={() => setIsModalOpen(true)}>
                        일기 작성하기
                    </button>   
                </div>
                {isModalOpen && (
                    <div style={style.modalOverlay} onClick={() => setIsModalOpen(false)}>
                        <div style={style.modalContent} onClick={(e) => e.stopPropagation()}>

                            <div style={style.modalHeader}>
                                <span style={style.modalTitle}>덕질 일기</span>
                                <button style={style.closeButton} onClick={() => setIsModalOpen(false)}>×</button>
                            </div>

                            <div style={style.imageRowContainer}>
                                {images.map((imgUrl, index) => (
                                    <div key={index} style={style.uploadedImageBox}>
                                        <img src={imgUrl} alt={`uploaded-${index}`} style={style.actualImage} />
                                        <button style={style.imageDeleteBtn} onClick={() => handleImageDelete(index)}>×</button>
                                    </div>
                                ))}
                                <div style={style.uploadBox} onClick={handleImageUpload}>
                                    <div style={style.uploadIcon}>📷</div>
                                    <span style={style.uploadText}>여기에 사진을 업로드 하세요</span>
                                </div>
                            </div>

                            <div style={style.inputSection}>
                                <label style={style.inputLabel}>일기를 작성해주세요 💌</label>
                                <textarea 
                                    style={style.textarea} 
                                    placeholder="기억하고 싶은 순간을 기록해보세요..."
                                    value={diaryText}
                                    onChange={(e) => setDiaryText(e.target.value)}
                                />
                            </div>

                            <button type="button" style={style.submitButton} onClick={handleSave}>
                                포스팅 완료하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const style = {
    diarySection: {
        display: "flex",
        flexDirection: "column",
        gap: "13px",
    },
    title: {
        color: "var(--gray-1)",
        fontWeight: "bold",
        fontSize: "20px",
    },
    diaryCard: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        border: "3px solid var(--outline-3)",
        backgroundColor: "var(--white)",
        borderRadius: "15px",
        padding: "14px 60px",
        boxSizing: "border-box",
        minHeight: '290px',
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
    },
    noDiaryContent: {
        display: "flex",
        flexDirection: "column",
        gap: "35px",
        width:"100%",
    },
    diaryImage: {
        width:"45px",
    },
    noDiaryIconMention: {
        alignItems: "center",
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    mentions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    noDiaryMention: {
        fontSize: '20px',
        color: 'var(--black)',
        letterSpacing: '1px',
        fontWeight: '500',
    },
    noDiarySubmMention: {
        fontSize: '16px',
        color: 'var(--gray-1)'
    },
    writeDiaryButton: {
        background: "linear-gradient(90deg, var(--button-2-left) 0%, var(--button-2-right) 100%)",
        border: "none",
        borderRadius: "10px",
        color: "var(--white)",
        padding:"13px 20px",
        width:"100%",
        fontSize: "16px",
        fontWeight: "bold",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // 뒷배경을 어둡게 블러 처리 느낌
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "var(--white)",
        width: "440px",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    modalHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    modalTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        background: "linear-gradient(to bottom, var(--button-1-top) 0%, var(--button-1-bottom) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
    },
    closeButton: {
        background: "none",
        border: "none",
        fontSize: "24px",
        color: "var(--gray-1)",
        cursor: "pointer",
    },
    imageRowContainer: {
        display: "flex",
        gap: "12px",
        width: "100%",
        overflowX: "auto",
        paddingBottom: "8px", 
    },
    uploadBox: {
        border: "2px dashed var(--gray-2)",
        borderRadius: "12px",
        width: "100px",  
        height: "130px", 
        flexShrink: 0, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        backgroundColor: "var(--light-gray)",
    },
    uploadIcon: {
        fontSize: "24px",
        color: "#A0B2D2",
    },
    uploadText: {
        fontSize: "10px", 
        color: "#A0B2D2",
        textAlign: "center",
        padding: "0 4px",
    },
    inputSection: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    inputLabel: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "var(--black)",
    },
    textarea: {
        width: "100%",
        height: "140px",
        borderRadius: "10px",
        border: "2px solid var(--gray-2)",
        padding: "14px",
        fontSize: "14px",
        boxSizing: "border-box",
        resize: "none",
        outline: "none",
        backgroundColor: "var(--light-gray)",
        color: "var(--black)",
    },
    submitButton: {
        background: "linear-gradient(90deg, var(--button-2-left) 0%, var(--button-2-right) 100%)",
        border: "none",
        borderRadius: "10px",
        color: "var(--white)",
        padding: "14px 0",
        width: "100%",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    uploadedImageBox: {
        position: "relative",
        width: "100px",
        height: "130px",
        borderRadius: "12px",
        overflow: "hidden",
        flexShrink: 0,
    },
    actualImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover", 
    },
    imageDeleteBtn: {
        position: "absolute",
        top: "4px",
        right: "4px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "var(--white)",
        border: "none",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
    }
};
