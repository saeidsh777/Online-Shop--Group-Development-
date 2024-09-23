'use client';

import { AuthContext, userStatus } from '@/contexts/AuthProvider';
import { redirect } from 'next/navigation';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { User } = useContext(AuthContext);

    switch (User.isLoggedIn) {
        case userStatus['loading']: {
            return '...loading';
        }
        case userStatus['loggedIN']: {
            return children;
        }
        case userStatus['loggedOUT']: {
            redirect('/auth/login');
        }
        default:
            throw new Error('User login status is unknown');
    }
};
export default PrivateRoute;
