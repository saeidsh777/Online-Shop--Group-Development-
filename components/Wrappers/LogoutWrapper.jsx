'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';

const LogoutWrapper = ({ children, onClick, ...props }) => {
    const { Handlers } = useContext(AuthContext);

    return (
        <div
            onClick={() => {
                Handlers.LogoutHandler();
            }}
            {...props}
        >
            {children}
        </div>
    );
};
export default LogoutWrapper;
