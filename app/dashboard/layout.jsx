import Header from '../../components/Headers/Dashboard/Header';
import Sidebar from '../../components/Sidebars/Dashboard/Sidebar';
import SidebarProvider from '../../contexts/SidebarProvider';

export default function DashboardLayout({ children }) {
    return (
        <main className="relative bg-dashboard-bg min-h-screen text-dashboard-text">
            <SidebarProvider>
                <Header />
                <Sidebar />
            </SidebarProvider>
            {children}
        </main>
    );
}
