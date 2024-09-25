'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { Roles } from '@/utils/Roles';
import { useContext } from 'react';

const PrivateRoleHandler = ({ children, minimum_Role = 0, onlyRole }) => {
    const { User } = useContext(AuthContext);

    if (onlyRole !== undefined) {
        if (Roles[User.details.role] === onlyRole) return children;

        return null;
    } else {
        if (Roles[User.details.role] >= minimum_Role) return children;

        return null;
    }
};
export default PrivateRoleHandler;
