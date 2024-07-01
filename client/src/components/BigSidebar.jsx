import NavLinks from './NavLinks';
import Logo from '../components/logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>{/* <Logo /> */}</header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
