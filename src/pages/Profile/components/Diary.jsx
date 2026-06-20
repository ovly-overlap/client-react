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
    const [images, setImages] = useState(todayDiary?.images ?? []); 

    const handleImageUpload = () => {
        const dummyImageUrl = DummyPost;
        setImages([...images, dummyImageUrl]);
    };

    const handleImageDelete = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleEdit = () => {
        setDiaryText(todayDiary?.text ?? "");
        setImages(todayDiary?.images ?? []);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        if (!window.confirm("오늘 작성한 일기를 삭제하시겠습니까?")) return;

        const nextDiaries = (currentUser.diaries ?? []).filter((diary) => diary.date !== todayKey);
        updateCurrentUser({ diaries: nextDiaries });

        setDiaryText("");
        setImages([]);
        alert("일기가 삭제되었습니다.");
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
                images: images, 
            },
        ];

        updateCurrentUser({ diaries: nextDiaries });
        markMissionCompleted("diaryWritten");

        alert("오늘의 일기가 저장되었습니다.");
        setIsModalOpen(false);
    };

    const handleOpenNewModal = () => {
        setDiaryText("");
        setImages([]);
        setIsModalOpen(true);
    };

    const currentUploadBoxStyle = images.length === 0 
        ? style.uploadBoxFull 
        : style.uploadBoxRow;

    const renderRegisteredDiaryGrid = (diary) => {
        const diaryImages = diary.images ?? [];
        const imgCount = diaryImages.length;

        return (
            <div style={style.registeredCard}>

                {imgCount > 0 && (
                    <div style={style.gridContainer}>
                        {imgCount === 1 && (
                            <div style={style.gridOne}>
                                <img src={diaryImages[0]} alt="diary-0" style={style.gridImage} />
                            </div>
                        )}

                        {imgCount === 2 && (
                            <div style={style.gridTwo}>
                                <img src={diaryImages[0]} alt="diary-0" style={style.gridImage} />
                                <img src={diaryImages[1]} alt="diary-1" style={style.gridImage} />
                            </div>
                        )}

                        {imgCount >= 3 && (
                            <div style={style.gridThreeContainer}>
                                <div style={style.gridThreeTop}>
                                    <img src={diaryImages[0]} alt="diary-0" style={style.gridImage} />
                                </div>
                                <div style={style.gridThreeBottom}>
                                    <img src={diaryImages[1]} alt="diary-1" style={style.gridImage} />
                                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                        <img src={diaryImages[2]} alt="diary-2" style={style.gridImage} />
                                        {imgCount > 3 && (
                                            <div style={style.moreImageOverlay}>
                                                +{imgCount - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <p style={style.registeredText}>{diary.text}</p>

                <div style={style.cardHeader}>
                    <div style={style.actionBtnGroup}>
                        <button style={style.actionBtn} onClick={handleEdit} title="수정">✏️</button>
                        <button style={style.actionBtn} onClick={handleDelete} title="삭제">🗑️</button>
                    </div>
                </div>
            </div>
            
        );
    };

    return (
        <div style={style.diarySection}>
            <span style={style.title}>오늘의 일기</span>
            
            {todayDiary ? (
                renderRegisteredDiaryGrid(todayDiary)
            ) : (
                <div style={style.diaryCard}>
                    <div style={style.noDiaryContent}>
                        <div style={style.noDiaryIconMention}>
                            <img src={DiaryIcon} alt="diary-icon" style={style.diaryImage}/>
                            <div style={style.mentions}>
                                <p style={style.noDiaryMention}>일기를 작성해보세요!</p>
                                <p style={style.noDiarySubmMention}>잊고 싶지 않은 순간이 있지 않나요?</p>
                            </div>
                        </div>
                        {/* 💡 새로 작성할 때 상태 비워주는 함수로 교체 */}
                        <button type='button' style={style.writeDiaryButton} onClick={handleOpenNewModal}>
                            일기 작성하기
                        </button>   
                    </div>
                </div>
            )}

            {/* 모달 팝업 레이아웃 */}
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
                            <div style={currentUploadBoxStyle} onClick={handleImageUpload}>
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
    );
}

const style = {
    diarySection: { display: "flex", flexDirection: "column", gap: "13px" },
    title: { color: "var(--gray-1)", fontWeight: "bold", fontSize: "20px" },
    diaryCard: {
        display: "flex", flexDirection: "column", gap: "12px",
        border: "3px solid var(--outline-3)", backgroundColor: "var(--white)",
        borderRadius: "15px", padding: "14px 60px", boxSizing: "border-box",
        minHeight: '290px', alignItems: 'center', justifyContent: 'center', width:"100%",
    },
    noDiaryContent: { display: "flex", flexDirection: "column", gap: "35px", width:"100%" },
    diaryImage: { width:"45px" },
    noDiaryIconMention: { alignItems: "center", justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '15px' },
    mentions: { display: 'flex', flexDirection: 'column', gap: '5px' },
    noDiaryMention: { fontSize: '20px', color: 'var(--black)', letterSpacing: '1px', fontWeight: '500' },
    noDiarySubmMention: { fontSize: '16px', color: 'var(--gray-1)' },
    writeDiaryButton: {
        background: "linear-gradient(90deg, var(--button-2-left) 0%, var(--button-2-right) 100%)",
        border: "none", borderRadius: "10px", color: "var(--white)", padding:"13px 20px", width:"100%", fontSize: "16px", fontWeight: "bold", cursor: "pointer"
    },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
    modalContent: { backgroundColor: "var(--white)", width: "440px", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "24px" },
    modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
    modalTitle: { fontSize: "20px", fontWeight: "bold", background: "linear-gradient(to bottom, var(--button-1-top) 0%, var(--button-1-bottom) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" },
    closeButton: { background: "none", border: "none", fontSize: "24px", color: "var(--gray-1)", cursor: "pointer" },
    imageRowContainer: { display: "flex", gap: "12px", width: "100%", overflowX: "auto", paddingBottom: "8px" },
    uploadBoxFull: { border: "2px dashed var(--gray-2)", borderRadius: "12px", width: "100%", height: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "6px", cursor: "pointer", backgroundColor: "var(--light-gray)" },
    uploadBoxRow: { border: "2px dashed var(--gray-2)", borderRadius: "12px", width: "100px", height: "150px", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "6px", cursor: "pointer", backgroundColor: "var(--light-gray)" },
    uploadIcon: { fontSize: "24px", color: "#A0B2D2" },
    uploadText: { fontSize: "13px", color: "#A0B2D2", textAlign: "center", padding: "0 4px" },
    inputSection: { display: "flex", flexDirection: "column", gap: "10px" },
    inputLabel: { fontSize: "15px", fontWeight: "bold", color: "var(--black)" },
    textarea: { width: "100%", height: "140px", borderRadius: "10px", border: "2px solid var(--gray-2)", padding: "14px", fontSize: "14px", boxSizing: "border-box", resize: "none", outline: "none", backgroundColor: "var(--light-gray)", color: "var(--black)" },
    submitButton: { background: "linear-gradient(90deg, var(--button-2-left) 0%, var(--button-2-right) 100%)", border: "none", borderRadius: "10px", color: "var(--white)", padding: "14px 0", width: "100%", fontSize: "16px", fontWeight: "bold", cursor: "pointer" },
    uploadedImageBox: { position: "relative", width: "100px", height: "150px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 },
    actualImage: { width: "100%", height: "100%", objectFit: "cover" },
    imageDeleteBtn: { position: "absolute", top: "4px", right: "4px", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "var(--white)", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" },

    registeredCard: {
        display: "flex", flexDirection: "column", gap: "12px",
        border: "3px solid var(--outline-3)", backgroundColor: "var(--white)",
        borderRadius: "15px", padding: "20px 24px 24px 24px", boxSizing: "border-box", width: "100%",alignItems: "flex-start",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "flex-end", // 오른쪽 정렬
        width: "100%",
    },
    actionBtnGroup: {
        display: "flex",
        gap: "10px",
    },
    actionBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        padding: "4px",
        opacity: 0.6,
        transition: "opacity 0.2s",
        ":hover": { opacity: 1 } // 마우스 올리면 선명하게
    },

    gridContainer: { width: "100%", borderRadius: "12px", overflow: "hidden" },
    gridImage: { width: "100%", height: "100%", objectFit: "cover" , border: "2px solid transparent", backgroundImage:`linear-gradient(to bottom, var(--outline-2-top), var(--outline-2-bottom) 100%)`, backgroundOrigin: "border-box", backgroundClip: `padding-box, border-box;`, borderRadius: "15px"},
    gridOne: { width: "100%", height: "220px" },
    gridTwo: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px", height: "220px"},
    gridThreeContainer: { display: "flex", flexDirection: "column", gap: "4px", height: "280px" },
    gridThreeTop: { width: "100%", height: "60%" },
    gridThreeBottom: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", height: "40%" },
    moreImageOverlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold" },
    registeredText: { fontSize: "16px", color: "var(--black)", lineHeight: "1.5", whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, textAlign: "left",     
    width: "100%",}
};