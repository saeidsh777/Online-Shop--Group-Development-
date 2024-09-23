'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';

export const Roles = {
    user: 0,
    admin: 1,
    owner: 2,
};

const PrivateRoleHandler = ({ children, minimum_Role = 0 }) => {
    const { User } = useContext(AuthContext);

    if (Roles[User.details.role] >= minimum_Role) {
        return children;
    }
    return null;
};
export default PrivateRoleHandler;
