'use client';

import { AuthContext, userStatus } from '@/contexts/AuthProvider';
import { RolesRouteAccess } from '@/utils/Roles';
import { redirect, usePathname } from 'next/navigation';
import { Suspense, useContext } from 'react';

const PrivateRouteRoleChecker = ({ children, role, currentRoute }) => {
    const HasAccess = [...RolesRouteAccess[role]].some(root => {
        const routes = [
            root.root,
            ...root.children.map(route => root.root + route),
        ];

        return routes.some(route => route === currentRoute);
    });

    if (HasAccess) {
        return children;
    }
    redirect('/'); // create a forbidden page
};

const PrivateRouteLoginChecker = ({ children }) => {
    const { User } = useContext(AuthContext);
    const pathName = usePathname();

    switch (User.isLoggedIn) {
        case userStatus['loading']: {
            return '...loading';
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
