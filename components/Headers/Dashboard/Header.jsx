'use client';

import { SidebarContext } from '@/contexts/SidebarProvider';
import { useContext } from 'react';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
    const { SwitchSidebarStatus } = useContext(SidebarContext);

    return (
        <header className="sticky top-0 left-0 bg-dashboard-bg/80 backdrop-blur-[8px] 1152:row-start-1 1152:row-end-1 1152:col-start-2 1152:col-end-3">
            <div className="mx-auto px-3.5 py-2 sm:py-4 sm:px-7 1152:py-6 flex items-center justify-between">
                <div
                    className="cursor-pointer bg-dashboard-bg rounded p-2.5  hover:bg-[#dbe0e5] transition-colors"
                    onClick={SwitchSidebarStatus}
                >
                    <FiMenu className="iconFontSize" />
                </div>
                <div>avatar</div>
            </div>
        </header>
    );
};
export default Header;
