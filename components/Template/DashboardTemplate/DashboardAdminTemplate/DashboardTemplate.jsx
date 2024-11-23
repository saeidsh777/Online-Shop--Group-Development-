'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';
import DashboardAdminTemplate from '../DashboardAdminTemplate';
import DashboardUserTemplate from '../DashboardUserTemplate/DashboardUserTemplate';

export default function DashboardTemplate() {
    const { User } = useContext(AuthContext);
    if (User.details.role === 'user') {
        return <DashboardUserTemplate />;
    } else {
        return <DashboardAdminTemplate />;
    }
}
