import React, { useState } from 'react';
import './Settings.css'
import '../../index.css'
import exampleProfile from '../../assets/example-profile.svg'
import downIcon from '../../assets/down-icons.svg'

export default function Settings() {

const user = {
  id: '주라미',
  introduce: '안녕하세요 주라미에요 저는 BTS 지민 좋아해요. 맞팔해요~😍'
}

const [userId, setUserId] = useState('');
const [userIntro, setUserIntro] = useState('');

const handleSave = () => {
  if (!userId) {
    alert('아이디를 입력해주세요!');
    return;
  }
  
};
  return (
    <>
      <div className='setting-section'>
        <div className='profile-card'>
          <p className='setting-title'>프로필 설정</p>
          <div className='profile-content'>
            <div className="profile-image">
                <img src={exampleProfile} alt="profile-image"/>
                <label htmlFor="file">
                    <div className='upload-btn'>프로필 사진</div>
                </label>
                <input type="file" name="file" id="file"/>
            </div> 

            <div className='profile-info'>
                <div>
                    <p className='sub-title'>아이디</p>
                    <input 
                      type="text" 
                      className='input' 
                      id='userId'
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                    {/* <p className='warning'>중복된 아이디입니다!</p> */}
                </div>
                <div className='introduce'>
                    <p className='sub-title'>자기 소개</p>
                    <textarea 
                      className='input' 
                      placeholder='자기소개를 입력해주세요'
                      value={userIntro}
                      onChange={(e) => setUserIntro(e.target.value)}
                    />
                </div>
                <div className='save-btn'>
                  <button onClick={handleSave}>저장하기</button>
                </div>
              </div>
          </div> 
        </div>

        <div className='screen-theme-card'>
          <p className='setting-title'>화면 테마</p>
            <form className='screen-theme'>
              <div className='radio-btn'><input type='radio' name='mode' value='light'/><p>light</p></div>
              <div className='radio-btn'><input type='radio' name='mode' value='dark'/><p>dark</p></div>
            </form>
          </div>

          <div className='faq-card'>
            <div className='setting-title'><p>자주 묻는 질문(FAQ)</p></div>
            <div className='faq-container'>
                <div className='question'><p>좋아하는 아이돌은 어떻게 추가하나요?</p><button><img src={downIcon}/></button></div>
                <div className='question'><p>좋아하는 아이돌은 어떻게 추가하나요?</p><button><img src={downIcon}/></button></div>
                <div className='question'><p>좋아하는 아이돌은 어떻게 추가하나요?</p><button><img src={downIcon}/></button></div>
                <div className='question'><p>좋아하는 아이돌은 어떻게 추가하나요?</p><button><img src={downIcon}/></button></div>
                <div className='question'><p>좋아하는 아이돌은 어떻게 추가하나요?</p><button><img src={downIcon}/></button></div>
              </div>
          </div>
      </div>
    </>
  )
}