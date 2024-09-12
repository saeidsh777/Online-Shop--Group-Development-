'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { User } = useContext(AuthContext);
    const Router = useRouter();

    if (!User.isLoggedIn) {
        Router.replace('/auth/login');
        return 'loading....';
    }

    return children;
};
export default PrivateRoute;
