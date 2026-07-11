import { Link } from "react-router-dom";
import logo from "../assets/Logo-image.svg";
import "./signuplogin.css";
import { useState } from "react";
import { loginUser } from "../utils/localStorage.js";
import { api } from "../api/axios.js";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post(
                "/auth/signin",
                {
                    username: username,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("반환값: ", res.data);

            window.location.href = "/timeline";
            // navigate("/timeline");
        } catch (err) {
            console.log("회원가입 실패 : ", err);
            alert("아이디 또는 비밀번호를 확인해주세요.");
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="card">
                    <form className="signupForm" onSubmit={handleSubmit}>
                        <div className="upupup">
                            <div className="upupupMention">
                                <img
                                    src={logo}
                                    alt="ovlylogo"
                                    className="LOGO"
                                />
                                <div className="title">ovly</div>
                            </div>
                            <p className="subtitle">
                                최애 아티스트와 함께하는 특별한 공간
                            </p>
                        </div>
                        <div className="idPassSection">
                            <div className="idSection">
                                <label className="ididid" htmlFor="userid">
                                    아이디
                                </label>
                                <input
                                    type="text"
                                    id="userid2"
                                    name="userid2"
                                    required
                                    placeholder="아이디를 입력해주세요."
                                    value={username ?? ""}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="passSection">
                                <label className="ididid" htmlFor="password">
                                    비밀번호
                                </label>
                                <input
                                    type="password"
                                    id="password2"
                                    name="password"
                                    required
                                    placeholder="비밀번호를 입력해주세요."
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {error && <p className="errorMsg">{error}</p>}
                        <div className="loginButton">
                            <button className="start" type="submit">
                                로그인
                            </button>
                            <p>
                                아직 계정이 없으신가요?{" "}
                                <Link to="/signup">회원가입</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
