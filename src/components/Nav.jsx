import { useNavigate, useLocation } from 'react-router-dom';
import './Nav.css'
import logo from '../assets/Logo-image.svg'
import homeIcon from '../assets/home-icon.svg'
import timeLineIcon from '../assets/timeline-icon.svg'
import profileIcon from '../assets/profile-icon.svg'
import settingsIcon from '../assets/settings-icon.svg'

const navItems = [
    { label: '홈', icon: homeIcon, path: '/' },
    { label: 'ovly', icon: timeLineIcon, path: '/timeline' },
    { label: '프로필', icon: profileIcon, path: '/profile' },
    { label: '설정', icon: settingsIcon, path: '/settings' }
]

function Nav(){
    const navigate = useNavigate();
    const location = useLocation();

    return (
    <>
        <nav className="nav-container">
            <div className="ovly-logo">
                <img src={logo} alt="logo"/>
                <p>ovly</p>
            </div>
            <div className="nav-button">
                {navItems.map(({ label, icon, path }) => (
                    <button
                        key={path}
                        onClick={() => navigate(path)}
                        className={location.pathname === path ? 'active' : ''}
                    >
                        <img src={icon} alt="" />
                        {label}
                    </button>
                ))}
            </div>
        </nav>
    </>
    )
}
export default Nav