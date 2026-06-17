import React, { useState } from 'react';
import './Settings.css'
import exampleProfile from '../../assets/example-profile.svg'
import downIcon from '../../assets/down-icons.svg'
import upIcon from '../../assets/up-icon.svg'
import { getCurrentUser, getUsers, updateCurrentUser } from '../../utils/localStorage.js';

const defaultUser = {
  id: 'guest',
  introduce: '로그인하면 자기소개를 저장할 수 있어요.'
};

export default function Settings() {

const [savedProfile] = useState(() => getCurrentUser() ?? defaultUser);
const [savedUserId, setSavedUserId] = useState(savedProfile.id);
const [userId, setUserId] = useState(savedProfile.id);
const [userIntro, setUserIntro] = useState(savedProfile.introduce);
const [openedFaqIndex, setOpenedFaqIndex] = useState(null);

const faqs = [
  {
    question: '좋아하는 아이돌 그룹은 어떻게 추가하나요?',
    answer: '프로필에서 관심 팬덤을 검색하여 추가하실 수 있습니다.',
  },
  {
    question: '프로필 사진은 어떻게 변경하나요?',
    answer: '프로필 설정에서 프로필 사진 버튼을 누른 뒤 원하는 이미지를 선택하시면 됩니다.',
  },
  {
    question: '관심 팬덤을 삭제할 수 있나요?',
    answer: '프로필의 관심 팬덤 목록에서 삭제하고 싶은 팬덤을 선택하여 제거할 수 있습니다.',
  },
  {
    question: '아이돌 일정 알림은 어디에서 확인하나요?',
    answer: '홈 화면의 알림 아이콘을 누르면 등록된 아이돌의 주요 일정 알림을 확인할 수 있습니다.',
  },
  {
    question: '타임라인에서 다른 팬의 글을 볼 수 있나요?',
    answer: '타임라인에서 같은 팬덤을 좋아하는 사용자들의 글과 활동을 확인할 수 있습니다.',
  },
];

const handleFaqToggle = (index) => {
  setOpenedFaqIndex((prevIndex) => (prevIndex === index ? null : index));
};

const handleSave = () => {
  const trimmedUserId = userId.trim();
  const users = getUsers();

  if (!trimmedUserId) {
    alert('아이디를 입력해주세요!');
    return;
  }

  if (trimmedUserId !== savedUserId && users[trimmedUserId]) {
    alert('이미 사용 중인 아이디입니다.');
    return;
  }

  const updatedUser = updateCurrentUser({
    id: trimmedUserId,
    introduce: userIntro,
  });

  if (!updatedUser) {
    alert('먼저 회원가입 또는 로그인을 해주세요.');
    return;
  }

  setUserId(trimmedUserId);
  setSavedUserId(trimmedUserId);
  alert('저장되었습니다.');
  
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
{/* 
        <div className='screen-theme-card'>
          <p className='setting-title'>화면 테마</p>
            <form className='screen-theme'>
              <div className='radio-btn'><input type='radio' name='mode' value='light'/><p>light</p></div>
              <div className='radio-btn'><input type='radio' name='mode' value='dark'/><p>dark</p></div>
            </form>
          </div> */}

          <div className='faq-card'>
            <div className='setting-title'><p>자주 묻는 질문(FAQ)</p></div>
            <div className='faq-container'>
                {faqs.map((faq, index) => {
                  const isOpen = openedFaqIndex === index;

                  return (
                    <div className={`faq-item ${isOpen ? 'open' : ''}`} key={`${faq.question}-${index}`}>
                      <div className='question'>
                        <p>{faq.question}</p>
                        <button
                          type='button'
                          onClick={() => handleFaqToggle(index)}
                          aria-expanded={isOpen}
                          aria-label={isOpen ? '답변 닫기' : '답변 열기'}
                        >
                          <img src={isOpen ? upIcon : downIcon} alt='' />
                        </button>
                      </div>
                      {isOpen && <p className='answer'>{faq.answer}</p>}
                    </div>
                  );
                })}
              </div>
          </div>
      </div>
    </>
  )
}
