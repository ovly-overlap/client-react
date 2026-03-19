import './Settings.css'
import exampleProfile from './assets/example-profile.svg'
function Settings() {

  return (
    <>
      <div className='setting-section'>
        <div className='profile-card'>
          <p className='title'>프로필 설정</p>
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
                    <input type="text" className='input'/>
                    <p className='warning'>중복된 아이디입니다!</p>
                </div>
                <div className='introduce'>
                    <p className='sub-title'>자기 소개</p>
                    <textarea className='input' placeholder='자기소개를 입력해주세요'/>
                </div>
                <div className='save-btn'>
                  <button>저장하기</button>
                </div>
              </div>
          </div> 
        </div>
      </div>

    </>
  )
}

export default Settings