// components/AlarmDropdown.jsx
import React from "react";
import DummyProfile from "../../../assets/dummy-profile.svg"
import { useState } from "react";

const initialAlarmData = [
  {
    id: 1,
    type: "FOLLOW",
    message: "<strong>주라미</strong>님이 팔로우했습니다.",
    timeLabel: "2분 전",
    senderAvatar: "https://example.com/jurami.jpg",
    isUnread: true,
  },
  {
    id: 2,
    type: "SCHEDULE",
    message: "곧 <strong>영등포 팬싸인회</strong> 일정이 다가옵니다.",
    timeLabel: "15분 전",
    isUnread: true,
  },
  {
    id: 3,
    type: "COMMENT",
    message: "<strong>주라미</strong>님이 당신의 게시물에 댓글을 달았습니다.",
    timeLabel: "2026.03.14 06:12",
    senderAvatar: "https://example.com/jurami.jpg",
    isUnread: true,
  },
  {
    id: 4,
    type: "HEART",
    message: "<strong>주라미</strong>님이 당신의 게시물에 하트를 눌렀습니다.",
    timeLabel: "2026.03.03 06:12",
    senderAvatar: "https://example.com/jurami.jpg",
    isUnread: false,
  },
];

export default function AlarmDropdown({ onClose }) {
  const myAvatar = DummyProfile; 

  const [alarms, setAlarms] = useState(initialAlarmData);

  const handleReadAll = () => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((item) => ({
        ...item,
        isUnread: false, 
      }))
    );
  };

  return (
    <>
      <div style={alarmStyle.overlay} onClick={onClose} />
      
      <div style={alarmStyle.container}>
        <div style={alarmStyle.header}>
          <span style={alarmStyle.title}>알림</span>
          <button style={alarmStyle.readAllBtn} onClick={handleReadAll}>
            모두 읽음
          </button>
        </div>
        
        <div style={alarmStyle.contentList}>
          {alarms.map((item) => {
            const avatarUrl = item.type === "SCHEDULE" ? myAvatar : item.senderAvatar;

            return (
              <div key={item.id} style={alarmStyle.item}>
                <div 
                  style={{
                    ...alarmStyle.avatar,
                    backgroundImage: avatarUrl ? `url(${avatarUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }} 
                />
                
                <div style={alarmStyle.itemText}>
                  <p 
                    style={alarmStyle.message} 
                    dangerouslySetInnerHTML={{ __html: item.message }} 
                  />
                  <span style={alarmStyle.timeLabel}>{item.timeLabel}</span>
                </div>

                {item.isUnread && <div style={alarmStyle.unreadDot}></div>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const alarmStyle = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999, 
    },
    container: {
        position: "absolute",
        top: "80px", 
        right: "40px",
        width: "385px",
        backgroundColor: "var(--white)",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        padding: "20px",
        zIndex: 1000, 
        fontFamily: "sans-serif",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "var(--black)",
    },
    readAllBtn: {
        background: "none",
        border: "none",
        color: "var(--nav-1)", 
        cursor: "pointer",
        fontSize: "13px",
    },
    contentList: {
        maxHeight: "400px",
        overflowY: "auto",
    },
    sectionTitle: {
        fontSize: "13px",
        color: "var(--gray-1)",
        margin: "10px 0 5px 0",
    },
    item: {
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        position: "relative",
    },
    avatar: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#111",
        marginRight: "12px",
        flexShrink: 0,
    },
    itemText: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "4px", 
        margin: 0,
    },
    message: {
        fontSize: "14px", 
        color: "var(--black)",
        lineHeight: "1.4",
        margin: 0,
    },
    timeLabel: {
        fontSize: "12px", 
        color: "var(--gray-1)",    
        margin: 0,
    },
    unreadDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "var(--button-3)",
        marginLeft: "8px",
        flexShrink: 0, 
    }
};