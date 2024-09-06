import SidebarSwitchBTN from './SidebarSwitchBTN';
import UserInfoBox from './UserInfoBox';

const Header = () => {
    return (
        <header className="sticky top-0 left-0 z-10 bg-dashboard-bg/80 backdrop-blur-[8px] 1152:row-start-1 1152:row-end-1 1152:col-start-2 1152:col-end-3">
            <div className="mx-auto px-3.5 py-2 sm:py-4 sm:px-7 1152:py-6 flex items-center justify-between">
                <SidebarSwitchBTN />
                <UserInfoBox />
            </div>
        </header>
    );
};
export default Header;
