import DummyProfile from "../../../assets/dummy-profile.svg"

export default function AlarmDropdown({alarms, onReadAll, onReadItem, onClose}) {
  const myAvatar = DummyProfile; 

  return (
    <>
      <style>{`
        .type-user strong {
          font-weight: 700 !important;
          color: var(--black) !important;
        }

        .type-schedule strong {
          font-weight: 800 !important; 
          color: var(--black) !important; 
        }
      `}</style>

      <div style={alarmStyle.overlay} onClick={onClose} />
      
      <div style={alarmStyle.container}>
        <div style={alarmStyle.header}>
          <span style={alarmStyle.title}>알림</span>
          <button style={alarmStyle.readAllBtn} onClick={onReadAll}>
            모두 읽음
          </button>
        </div>
        
        <div style={alarmStyle.contentList}>
          {alarms.map((item) => {
            const avatarUrl = item.type === "SCHEDULE" ? myAvatar : item.senderAvatar;
            const messageClass = item.type === "SCHEDULE" ? "type-schedule" : "type-user";

            return (
              <div 
                key={item.id} 
                style={{ ...alarmStyle.item, cursor: "pointer" }} 
                onClick={() => onReadItem(item.id)}
              >
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
                    className={messageClass}
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
