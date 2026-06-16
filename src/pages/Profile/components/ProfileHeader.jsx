import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileHeader.css";
import "../../../index.css";
import ExampleProfileImage from "../../../assets/example-profile.svg";
import coloredNextIcon from "../../../assets/colored-next-icon.svg";
import kebabIcon from "../../../assets/kebab-icon.svg";
import BtsIcon from "../../BTS-Logo.png";

export default function Profile() {
    const [isFollowing, setFollowing] = useState(false);

    const [favGroups, setFavGroups] = useState([
        {id: 1, name: "BTS", logo: BtsIcon},
        {id: 2, name: "BOYNEXTDOOR", logo: BtsIcon},
        {id: 3, name: "BIGBANG", logo: BtsIcon},
        {id: 4, name: "NCT", logo: BtsIcon}
        
    ]);

    const toggleFollow = () => {
        setFollowing(!isFollowing);
    };

    const handleAddGroup = () => {
        // 최애 그룹 추가 페이지로 이동
    };

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
                    <div className="following-Follower">
                        <div className="follow-stat">
                            <p className="followCount">0</p>
                            <p className="followLabel">팔로잉</p>
                        </div>
                        <div className="follow-stat">      
                            <p className="followCount">0</p>
                            <p className="followLabel">팔로워</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="userSet">
                <div className="userBtn">
                    {/* <button 
                        onClick={toggleFollow}
                        className={`follow-btn ${isFollowing ? 'active' : ''}`}
                    >
                        {isFollowing ? '팔로잉' : '팔로우'}
                    </button> */}
                    {/* <button className="drop-btn">
                        <img src={kebabIcon} alt="더보기"/>
                    </button> */}
                </div>

                <div className="userFavGroups">
                    {favGroups.length > 0 ? (
                        <div className="groupBadgeList">
                            {favGroups.map((group) => (
                                <div key={group.id} className="groupBadge" title={group.name}>
                                    <img src={group.logo} alt={group.name} />
                                </div>
                            ))}
                            <Link to="/fav-groups" className="add-group-btn small"><img src={coloredNextIcon}/></Link>
                        </div>
                    ) : (
                        <Link to="/fav-groups" className="add-group-btn big" onClick={handleAddGroup}>
                            <span className="add-group-label">최애 팬덤 설정하러가기</span>
                            <img src={coloredNextIcon}/>
                        </Link>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

const style = {
    
}