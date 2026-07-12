import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileHeader.css";
import "../../../index.css";
import ExampleProfileImage from "../../../assets/example-profile.svg";
import coloredNextIcon from "../../../assets/colored-next-icon.svg";
import kebabIcon from "../../../assets/kebab-icon.svg";

export default function ProfileHeader({
  isMyProfile = false,
  //   userName = "주라미",
  //   introduce = "소개글",
  //   favGroups = [],
  profile,
}) {
  const [isFollowing, setFollowing] = useState(false);

  const toggleFollow = () => {
    setFollowing(!isFollowing);
  };

  return (
    <>
      <div className="ProfileCard">
        <div className="ProfileInfo">
          <div className="ProfileImage">
            <img
              src={profile?.profileImageUrl ?? ExampleProfileImage}
              alt="ProfileImage"
            />
          </div>
          <div className="userInfo">
            <div className="userIntro">
              <p className="userName">{profile?.username}</p>
              <p className="introduction">{profile?.intro || "소개글"}</p>
            </div>
            <div className="following-Follower">
              <div className="follow-stat">
                <p className="followCount">{profile?.followingCount}</p>
                <p className="followLabel">팔로잉</p>
              </div>
              <div className="follow-stat">
                <p className="followCount">{profile?.followerCount}</p>
                <p className="followLabel">팔로워</p>
              </div>
            </div>
          </div>
        </div>
        <div className="userSet">
          <div className="userBtn">
            {!isMyProfile && (
              <>
                <button
                  onClick={toggleFollow}
                  className={`follow-btn ${isFollowing ? "active" : ""}`}
                >
                  {isFollowing ? "팔로잉" : "팔로우"}
                </button>
                <button className="drop-btn">
                  <img src={kebabIcon} alt="더보기" />
                </button>
              </>
            )}
          </div>

          <div className="userFavGroups">
            {profile?.userFandom.length > 0 ? (
              <div className="groupBadgeList">
                {profile?.userFandom.map((group) => (
                  <div key={group.id} className="groupBadge" title={group.name}>
                    <img src={group.logo} alt={group.name} />
                  </div>
                ))}
                <Link
                  to="/fav-groups"
                  state={{ isMyProfile: isMyProfile, userName: userName }}
                  className="add-group-btn small"
                >
                  <img src={coloredNextIcon} alt="더보기" />
                </Link>
              </div>
            ) : (
              isMyProfile && (
                <Link to="/fav-groups" className="add-group-btn big">
                  <span className="add-group-label">
                    최애 팬덤 설정하러가기
                  </span>
                  <img src={coloredNextIcon} alt="이동" />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
