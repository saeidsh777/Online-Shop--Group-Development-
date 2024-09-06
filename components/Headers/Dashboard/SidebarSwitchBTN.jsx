'use client';
import { SidebarContext } from '@/contexts/SidebarProvider';
import { useContext } from 'react';
import { FiMenu } from 'react-icons/fi';

const SidebarSwitchBTN = () => {
    const { SwitchSidebarStatus } = useContext(SidebarContext);

    return (
        <div
            className="cursor-pointer bg-dashboard-bg rounded p-2.5  hover:bg-[#dbe0e5] transition-colors"
            onClick={SwitchSidebarStatus}
        >
            <FiMenu className="iconFontSize" />
        </div>
    );
};
export default SidebarSwitchBTN;
