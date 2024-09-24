'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { Roles } from '@/utils/Roles';
import { useContext } from 'react';

const PrivateRoleHandler = ({ children, minimum_Role = 0 }) => {
    const { User } = useContext(AuthContext);

    if (Roles[User.details.role] >= minimum_Role) {
        return children;
    }
    return null;
};
export default PrivateRoleHandler;
