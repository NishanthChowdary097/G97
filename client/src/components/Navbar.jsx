import Wrapper from '../assets/wrappers/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          {/* <Logo /> */}
          {/* <h4 className="logo-text">dashboard</h4> */}
          <input type="text" style={{ width: '60vw', height: '5vh' }} />
        </div>
        <div className="btn-container">
          {/* <ThemeToggle /> */}

          <Link to="/addsub" className="btn">
            Submit
          </Link>
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
