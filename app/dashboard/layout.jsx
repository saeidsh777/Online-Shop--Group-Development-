import BreadCrumb from '@/components/Breadcrumbs/DashboardBD';
import Header from '../../components/Headers/Dashboard/Header';
import Sidebar from '../../components/Sidebars/Dashboard/Sidebar';
import SidebarProvider from '../../contexts/SidebarProvider';

export default function DashboardLayout({ children }) {
    return (
        <main className="relative bg-dashboard-bg min-h-screen text-dashboard-text 1152:grid 1152:grid-rows-[auto,1fr] 1152:grid-cols-[auto,1fr]">
            <SidebarProvider>
                <Header />
                <Sidebar />
            </SidebarProvider>
            <div className="1152:row-start-2 1152:row-end-3 1152:col-start-2 1152:col-end-3 px-4 425:px-6 md:px-8 pb-3">
                <BreadCrumb />
                {children}
            </div>
        </main>
    );
}
