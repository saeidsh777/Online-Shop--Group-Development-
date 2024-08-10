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
                className={`fixed min-h-screen top-0 bg-white w-[280px]  transition-all duration-200 flex flex-col xl:sticky xl:h-screen xl:row-start-1 xl:row-end-3 xl:col-start-1 xl:col-end-2 border-r border-dashed border-r-transparent Dashboard_Sidebar xl:overflow-hidden  ${
                    isSidebarActive
                        ? 'left-0 xl:border-r-dashboard-text xl:bg-dashboard-bg  xl:max-w-[280px] active '
                        : '-left-full xl:shadow-xl xl:max-w-[84px]'
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
