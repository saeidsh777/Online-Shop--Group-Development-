import DashboardBox from '@/components/Boxes/DashboardBox';
import NotificationBox from '@/components/Boxes/NotificationBox/NotificationBox';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';
import React from 'react';

export default function CreateNotoficationPage() {
    return (
        <>
            <SectionTitel title="Create Notification" />
            <DashboardBox>
                <NotificationBox />
            </DashboardBox>
        </>
    );
}
