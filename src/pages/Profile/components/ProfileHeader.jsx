import { useState } from "react";
import "./ProfileHeader.css";
import "../../../index.css"
import ExampleProfileImage from "../../../assets/example-profile.svg";
import kebabIcon from "../../../assets/kebab-icon.svg"
export default function Profile() {
    const [isFollowing, setFollowing] = useState(false);

    const toggleFollow = () => {
        setFollowing(!isFollowing);
    }

    const favGroup = ["BTS","BOYNEXTDOOR","BIGBANG"];

    return (
        <>
        <div className="ProfileCard">
            <div className="ProfileInfo">
                <div className="ProfileImage">
                    <img src={ExampleProfileImage} alt="ProfileImage" />
                </div>
                <div className="userInfo">
                    <div className="userIntro">
                        <p className="userName">USERNAME</p>
                        <p className="introduction">소개글</p>
                    </div>
                    <div className="following-Follwer">
                        <div className="following">
                            <p>0</p><p className="followNum">팔로잉</p>
                        </div>
                        <div className="follower">      
                            <p>0</p><p className="followNum">팔로워</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userSet">
                <div className="userBtn">
                    <button 
                        onClick={toggleFollow}
                        className={`follow-btn ${isFollowing ? 'active' : ''}`}
                    >
                        {isFollowing ? '팔로잉' : '팔로우'}
                    </button>
                    <button className="drop-btn"><img src={kebabIcon}/></button>
                </div>
                <div className="userFavGroups">
                    {/* 좋아하는 그룹있으면 추가 */}
                </div>
            </div>
        </div>
        </>
    )
}