import AdminProfile from '@/components/AdminProfile/AdminProfile';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import React from 'react';

export default function ProfilePage() {
    return (
        <div>
            <SectionTitel title="Profile" />
            <AdminProfile />
        </div>
    );
}
