import React, { useState } from "react";
import SearchBar from "../../components/SearchBar"; 
import "./SearchModal.css";
import IMG from "../../assets/example-profile.svg";
import upwardArrowIcon from "../../assets/left-arrow-icon.svg";

const dummyUsers = [
  { id: 1, name: "Jin라면먹고싶다", avatar: IMG },
  { id: 2, name: "망개떡", avatar: IMG },
  { id: 3, name: "우나기", avatar: IMG },
  { id: 4, name: "ChristmasTree", avatar: IMG },
  { id: 5, name: "지민", avatar: IMG },
  { id: 6, name: "지민귀여워", avatar: IMG },
  { id: 7, name: "지민이랑결혼하고싶다", avatar: IMG },
  { id: 8, name: "테스트유저5", avatar: IMG },
  { id: 9, name: "테스트유저5", avatar: IMG },
  { id: 10, name: "테스트유저5", avatar: IMG },
  { id: 11, name: "테스트유저5", avatar: IMG },
  
];

function SearchModal({ isOpen, onClose }) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);

  if (!isOpen) return null;

  const handleCardClick = (user) => {
    console.log(`유저 카드 클릭됨 -> ID: ${user.id}, 이름: ${user.name}`);
  };

  const handleFollowClick = (e, user) => {
    e.stopPropagation();
    
    setFollowedUsers((prev) => {
      if (prev.includes(user.id)) {
        return prev.filter((id) => id !== user.id); // 팔로우 해제
      } else {
        return [...prev, user.id]; // 팔로우 등록
      }
    });
  };

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(localSearchQuery.toLowerCase())
  );

  return (
    <div className="search-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="search-modal-container">
        
        <div className="search-modal-header">
          <button className="search-modal-back-btn" onClick={onClose}>
            <img src={upwardArrowIcon} alt="back-arrow" className="back-arrow-img" />
          </button>
          <h2 className="search-modal-title">검색</h2>
        </div>

        <div className="search-input-wrapper">
          <SearchBar 
            placeholder="유저 이름으로 검색" 
            value={localSearchQuery} 
            onChange={handleSearchChange}
          />
        </div>

        <div className="search-results-content">
          <div className="search-cards-grid">
            {filteredUsers.map((user) => {
              const isFollowed = followedUsers.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="user-search-card"
                  onClick={() => handleCardClick(user)}
                >
                  <div className="avatar-wrapper">
                    <img 
                      src={user.avatar} 
                      alt={`${user.name}-avatar`} 
                      className="user-card-avatar" 
                      
                    />
                  </div>
                  <div className="user-card-name">{user.name}</div>
                  
                  <button
                    className={`user-card-follow-btn ${isFollowed ? "active" : ""}`}
                    onClick={(e) => handleFollowClick(e, user)}
                  >
                    {isFollowed ? "팔로잉" : "팔로우"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SearchModal;