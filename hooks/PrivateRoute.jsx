'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { redirect } from 'next/navigation';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { User } = useContext(AuthContext);

    if (!User.isLoggedIn) {
        redirect('/auth/login');
    }

    return children;
};
export default PrivateRoute;
