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

    return (
        <>
        <div className="ProfileCard">
            <div className="ProfileInfo">
                <div className="ProfileImage">
                    <img src={ExampleProfileImage} alt="ProfileImage" />
                </div>
                <div className="userIntroduction">
                    <p className="userName">USERNAME</p>
                    <div className="following-Follwer">
                        <div className="following">
                            <p>0 팔로잉</p>
                        </div>
                        <div className="follower">      
                            <p>0 팔로워</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={toggleFollow} className="follow-btn">
                    {isFollowing ? '팔로잉' : '팔로우'}
                </button>
                <button><img src={kebabIcon} alt=""/></button>
            </div>
        </div>
        </>
    )
}