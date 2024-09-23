'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';

const LogoutWrapper = ({ children }) => {
    const { Handlers } = useContext(AuthContext);

    return (
        <div
            onClick={() => {
                Handlers.LogoutHandler();
            }}
        >
            {children}
        </div>
    );
};
export default LogoutWrapper;
