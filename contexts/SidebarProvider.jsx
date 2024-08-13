'use client';

import { usePathname } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';

export const SidebarContext = createContext(false);

const SidebarProvider = ({ children }) => {
    const [status, setStatus] = useState(false);

    const SwitchSidebarStatus = useCallback(() => {
        setStatus(prv => !prv);
    }, [setStatus]);

    const CloseSidebar = useCallback(() => {
        setStatus(false);
    }, [setStatus]);

    const contextValue = { status, SwitchSidebarStatus, CloseSidebar };

    // add keydown listener for Escape code on window
    // to close sidebar when its active
    useEffect(() => {
        const ESClistener = event => {
            event.code === 'Escape' && CloseSidebar();
        };

        if (!status) {
            window.removeEventListener('keydown', ESClistener);
            return;
        }

        window.addEventListener('keydown', ESClistener);

        return () => {
            window.removeEventListener('keydown', ESClistener);
        };
    }, [status, CloseSidebar]);

    const pathName = usePathname();

    useEffect(() => {
        CloseSidebar();
    }, [pathName, CloseSidebar]);

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
};
export default SidebarProvider;
