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
                className={`fixed min-h-screen top-0 bg-white w-[280px] xl:w-[350px] transition-all duration-200 flex flex-col ${
                    isSidebarActive ? 'left-0' : '-left-full'
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
