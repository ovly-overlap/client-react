import { Link } from "react-router-dom";
import logo from "../assets/Logo-image.svg";
import "./signuplogin.css";
import { useState } from "react";

function Login() {
    return (
        <>
            <div className="wrapper">
                <div className="card">
                    <form className="signupForm">
                        <div className="upupup">
                            <img src={logo} alt="ovlylogo" className="LOGO" />
                            <span className="title">ovly</span>
                            <p className="subtitle">
                                최애 아티스트와 함께하는 특별한 공간
                            </p>
                        </div>
                        <br />
                        <div>
                            <label className="ididid" htmlFor="uaserid">
                                아이디
                            </label>
                            <br />
                            <input
                                type="text"
                                id="userid2"
                                name="userid2"
                                required
                                placeholder="아이디를 입력해주세요."
                            />
                        </div>
                        <br />
                        <div>
                            <label className="ididid" htmlFor="password">
                                비밀번호
                            </label>
                            <br />
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                required
                                placeholder="비밀번호를 입력해주세요."
                            />
                        </div>
                        <br />
                        <button className="start" type="submit">
                            로그인
                        </button>
                        <p>
                            이미 계정이 있으신가요?{" "}
                            <Link to="/signup">회원가입</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
