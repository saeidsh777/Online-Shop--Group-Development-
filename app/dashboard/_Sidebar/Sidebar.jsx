'use client';

import { SidebarContext } from '@/app/_Contexts/SidebarProvider';
import { useContext } from 'react';
import BgOverlay from './BgOverlay';
import Logo from './Logo';
import LogoutButton from './LogoutButton';
import SidebarLinks from './SidebarLinks';

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
