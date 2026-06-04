import { useState } from "react";
import "./Profile.css";
import ExampleProfileImage from "../../../assets/example-profile.svg";
export default function Profile() {
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

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}