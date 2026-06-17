import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Logo-image.svg';
import "./Signuplogin.css";
import { useState } from "react";
import { createUser, isUserIdAvailable } from "../utils/localStorage.js";

function Signup() {
  const navigate = useNavigate();
  const [ userid , setUserid ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ confirmPw , setConfirmPw ] = useState("");
  const [ error , setError ] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);

  const xmrtn = (e) => {
    const value = e.target.value;
    setUserid(value);
    setIsChecked(false);
    let errorMsg = "";
    
    if(value){
      if(!/^[가-힣a-zA-Z0-9_.]+$/.test(value)){
        errorMsg = "영문, 숫자, 한글, _ . 만 사용할 수 있어요.";
      }
      else if(value.length < 2 || value.length > 17){
        errorMsg = "글자수는 3글자 이상 16글자 이하로 해주세요."
      }

    }
    
    setError(errorMsg);
  }

  const doublecheck = () => {
    if (error || !userid) {
      setError("아이디를 다시 확인해주세요.");
      return;
    }

    if (isUserIdAvailable(userid)) {
      setError("사용 가능한 아이디입니다.");
      setIsAvailable(true);
    } else {
      setError("이미 존재하는 아이디입니다.");
      setIsAvailable(false);
    }

    setIsChecked(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!isChecked) {
      setError("아이디 중복확인을 해주세요.");
      return;
    }
  
    if (!isAvailable) {
      setError("사용할 수 없는 아이디입니다.");
      return;
    }

    if (password.length < 4) {
      setError("비밀번호는 4글자 이상 입력해주세요.");
      return;
    }

    if (password !== confirmPw) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const result = createUser({ id: userid, password });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/");
  
  };

  return(
    <>
      <div className='wrapper'>
        <div className='card'>
        <form className='signupForm' onSubmit={handleSubmit}>
        <div className='upupup'>
          <img src={logo} alt='ovlylogo' className='LOGO'/>
          <span className='title'>ovly</span>
          <p className='subtitle'>최애 아티스트와 함께하는 특별한 공간</p>
        </div>
        <div>
          <label className='ididid' htmlFor="userid">아이디</label>
          <div className="idDoubleCheck">
            <input type="text" id='userid' name='userid' required placeholder='아이디를 입력해주세요.' value={userid} onChange={xmrtn}/>
            <button type='button' className='doublecheck' onClick={doublecheck}>중복확인</button>
          </div>
          {error && <p className="errorMsg">{error}</p>}
        </div>
        <div>
          <label className='ididid' htmlFor="password">비밀번호</label>
          <input type="password" id='password' name='password' required placeholder='비밀번호를 입력해주세요.' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label className='ididid' htmlFor="confirmpw">비밀번호 확인</label>
          <input type="password" id='confirmpw' name='confirmpw' required placeholder='비밀번호를 입력해주세요.' value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
        </div>
        <button className='start' type='submit'>시작하기</button>
        <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
        </form>
        </div>
      </div>
      </>
  )
}


export default Signup;
