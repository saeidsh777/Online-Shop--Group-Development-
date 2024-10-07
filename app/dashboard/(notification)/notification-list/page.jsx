'use client';
import DashboardBox from '@/components/Boxes/DashboardBox';
import NotificationTabel from '@/components/Table/NotificationTabel/NotificationTabel';
import SectionTitel from '@/components/Titels/SectionTitel/SectionTitel';


export default function NotificationListPage() {
    
    return (
        <>
            <SectionTitel title="Notification List" />
            <DashboardBox>
                <NotificationTabel />
            </DashboardBox>
        </>
    );
}
