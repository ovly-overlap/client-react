import { useState } from "react";
import { getCurrentUser, getTodayKey, markMissionCompleted, updateCurrentUser } from "../../../utils/localStorage.js";

export default function Diary() {
    const currentUser = getCurrentUser();
    const todayKey = getTodayKey();
    const todayDiary = currentUser?.diaries?.find((diary) => diary.date === todayKey);
    const [diaryText, setDiaryText] = useState(todayDiary?.text ?? "");

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
    };

    return (
        <div style={style.diarySection}>
            <span style={style.title}>오늘의 일기</span>
            <div style={style.diaryCard}>
                <textarea
                    value={diaryText}
                    onChange={(e) => setDiaryText(e.target.value)}
                    placeholder="오늘의 덕질 기록을 남겨보세요."
                    style={style.textarea}
                />
                <button type="button" onClick={handleSave} style={style.saveButton}>
                    저장하기
                </button>
            </div>
        </div>
    );
}

const style = {
    diarySection: {
        display: "flex",
        flexDirection: "column",
        gap: "13px",
        marginTop: "24px",
        width: "390px",
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
        padding: "14px 16px",
        boxSizing: "border-box",
    },
    textarea: {
        width: "100%",
        minHeight: "90px",
        border: "1px solid var(--outline-3)",
        borderRadius: "10px",
        color: "var(--black)",
        fontSize: "14px",
        outline: "none",
        resize: "vertical",
    },
    saveButton: {
        alignSelf: "flex-end",
        border: "none",
        borderRadius: "10px",
        backgroundColor: "var(--button-3)",
        color: "var(--white)",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 700,
        padding: "9px 18px",
    },
};
