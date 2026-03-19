import React from "react";
import './Nav.css'
import logo from './assets/Logo-image.svg'
import homeIcon from './assets/home-icon.svg'
import timeLineIcon from './assets/timeline-icon.svg'
import profileIcon from './assets/profile-icon.svg'
import settingsIconChecked from './assets/settings-icon.svg'

function Nav(){
    const Home = () =>{
    }
    const TimeLine = () =>{
    }
    const Profile = () =>{
    }
    const Settings = () =>{
    }
    return (
    <>
    <nav>
        <div className="ovly-logo">
            <img src={logo} alt="logo"/><span>ovly</span>
        </div>
        <div className="nav-button">
            <button onClick={Home}><img src={homeIcon}/>홈</button>
            <button onClick={TimeLine} className="timeline"><img src={timeLineIcon}/>ovly</button>
            <button onClick={Profile}><img src={profileIcon}/>프로필</button>
            <button onClick={Settings}><img src={settingsIconChecked}/>설정</button>
        </div>
    </nav>
    </>
    )
}
export default Nav