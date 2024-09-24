'use client';

import { AuthContext, userStatus } from '@/contexts/AuthProvider';
import { redirect, usePathname } from 'next/navigation';
import { Suspense, useContext } from 'react';
import Loading from '../Loading/Loading';

const PrivateRouteHandler = ({ children }) => {
    const { User } = useContext(AuthContext);
    const pathName = usePathname();

    switch (User.isLoggedIn) {
        case userStatus['loading']: {
            return <Loading />;
        }
        case userStatus['loggedIN']: {
            return children;
        }
        case userStatus['loggedOUT']: {
            redirect('/auth/login?from=' + pathName);
        }
        default:
            throw new Error('User login status is unknown');
    }
    
};

const PrivateRoute = ({ children }) => {
    return (
        <Suspense fallback="loading...">
            <PrivateRouteHandler>{children}</PrivateRouteHandler>
        </Suspense>
    );
};

export default PrivateRoute;
