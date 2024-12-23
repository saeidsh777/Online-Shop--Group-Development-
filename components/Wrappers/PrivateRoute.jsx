'use client';

import { AuthContext, userStatus } from '@/contexts/AuthProvider';
import { RolesRouteAccess } from '@/utils/Roles';
import { redirect, usePathname } from 'next/navigation';
import { Suspense, useContext } from 'react';
import Loading from '../Loading/Loading';

const PrivateRouteRoleChecker = ({ children, role, currentRoute }) => {
    return children;
    const HasAccess = [...RolesRouteAccess[role]].some(root => {
        const routes = [
            root.root,
            ...root.children.map(route => root.root + route),
        ];

        return routes.some(route => {
            if (route === currentRoute) {
                return true;
            }
            if (route.includes('*')) {
                const newRoute = route.replace(/\/\*/g, '');
                return currentRoute.includes(newRoute);
            }
        });
    });

    if (HasAccess) {
        // there is some issue in development
        return children;
    }
    redirect('/'); // create a forbidden page
};

const PrivateRouteLoginChecker = ({ children }) => {
    const { User } = useContext(AuthContext);
    const pathName = usePathname();

    switch (User.isLoggedIn) {
        case userStatus['loading']: {
            return <Loading />;
        }
        case userStatus['loggedIN']: {
            return (
                <PrivateRouteRoleChecker
                    role={User.details.role}
                    currentRoute={pathName}
                >
                    {children}
                </PrivateRouteRoleChecker>
            );
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
            <PrivateRouteLoginChecker>{children}</PrivateRouteLoginChecker>
        </Suspense>
    );
};

export default PrivateRoute;
