'use client';

import { SidebarContext } from '@/contexts/SidebarProvider';
import { useContext } from 'react';
import BgOverlay from './Parts/BgOverlay';
import Logo from './Parts/Logo';
import LogoutButton from './Parts/LogoutButton';
import SidebarLinks from './Parts/SidebarLinks/SidebarLinks';

const Sidebar = () => {
    const { status: isSidebarActive, CloseSidebar } =
        useContext(SidebarContext);

    return (
        <>
            <BgOverlay
                isSidebarActive={isSidebarActive}
                CloseSidebar={CloseSidebar}
            />

            {/* sidebar */}
            <div
                className={`fixed min-h-screen top-0 bg-white w-[280px]  transition-all duration-200 flex flex-col 1152:sticky 1152:h-screen 1152:row-start-1 1152:row-end-3 1152:col-start-1 1152:col-end-2 border-r border-dashed border-r-transparent Dashboard_Sidebar 1152:overflow-hidden  ${
                    isSidebarActive
                        ? 'left-0 1152:border-r-dashboard-text 1152:bg-dashboard-bg  1152:max-w-[280px] active '
                        : '-left-full 1152:shadow-xl 1152:max-w-[84px]'
                }`}
            >
                <Logo />
                <SidebarLinks />
                <LogoutButton />
            </div>
        </>
    );
};
export default Sidebar;
