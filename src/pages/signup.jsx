import { Link } from "react-router-dom";
import logo from "../assets/Logo-image.svg";
import "./signuplogin.css";
import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);

    const navigate = useNavigate();

    const xmrtn = (e) => {
        const value = e.target.value;
        setUserid(value);
        setIsChecked(false);
        let errorMsg = "";

        if (value) {
            if (!/^[가-힣a-zA-Z0-9_.]+$/.test(value)) {
                errorMsg = "영문, 숫자, 한글, _ . 만 사용할 수 있어요.";
            } else if (value.length < 2 || value.length > 17) {
                errorMsg = "글자수는 3글자 이상 16글자 이하로 해주세요.";
            }
        }

        setError(errorMsg);
    };

    const doublecheck = async () => {
        if (!userid) {
            setError("아이디를 다시 확인해주세요.");
            return;
        }

        try {
            const response = await api.get("/auth/signup/check-id", {
                params: {
                    username: userid,
                },
            });

            const data = response.data;
            console.log(data);

            if (!data.isAvaliable) {
                setError("이미 존재하는 아이디입니다.");
                setIsAvailable(false);
            } else {
                setError("사용 가능한 아이디입니다.");
                setIsAvailable(true);
            }

            setIsChecked(true);
        } catch (error) {
            console.log(error);
            setError("서버 오류");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isChecked) {
            setError("아이디 중복확인을 해주세요.");
            return;
        }

        if (!isAvailable) {
            setError("사용할 수 없는 아이디입니다.");
            return;
        }
        try {
            const res = await api.post("/auth/signup", {
                username: userid.toString(),
                password: password.toString(),
                passwordConfirm: confirmPassword.toString(),
            });
            console.log("반환값: ", res.data);

            navigate("/login");
        } catch (err) {
            console.log("회원가입 실패 : ", err);
            setError("회원가입 실패");
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="card">
                    <form className="signupForm" onSubmit={handleSubmit}>
                        <div className="upupup">
                            <img src={logo} alt="ovlylogo" className="LOGO" />
                            <span className="title">ovly</span>
                            <p className="subtitle">
                                최애 아티스트와 함께하는 특별한 공간
                            </p>
                        </div>
                        <div>
                            <label className="ididid" htmlFor="userid">
                                아이디
                            </label>
                            <div className="idDoubleCheck">
                                <input
                                    type="text"
                                    id="userid"
                                    name="userid"
                                    required
                                    placeholder="아이디를 입력해주세요."
                                    value={userid ?? ""}
                                    onChange={xmrtn}
                                />
                                <button
                                    type="button"
                                    className="doublecheck"
                                    onClick={doublecheck}
                                >
                                    중복확인
                                </button>
                            </div>
                            {error && <p className="errorMsg">{error}</p>}
                        </div>
                        <div>
                            <label className="ididid" htmlFor="password">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                value={password ?? ""}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                required
                                placeholder="비밀번호를 입력해주세요."
                                autoComplete="new-password"
                            />
                        </div>
                        <div>
                            <label className="ididid" htmlFor="confirmpw">
                                비밀번호 확인
                            </label>
                            <input
                                type="password"
                                id="confirmpw"
                                name="confirmpw"
                                value={confirmPassword ?? ""}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                placeholder="비밀번호를 입력해주세요."
                                autoComplete="new-password"
                            />
                        </div>
                        <button className="start" type="submit">
                            시작하기
                        </button>
                        <p>
                            이미 계정이 있으신가요?{" "}
                            <Link to="/login">로그인</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
