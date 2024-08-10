import Header from '../../components/Headers/Dashboard/Header';
import Sidebar from '../../components/Sidebars/Dashboard/Sidebar';
import SidebarProvider from '../../contexts/SidebarProvider';

export default function DashboardLayout({ children }) {
    return (
        <main className="relative bg-dashboard-bg min-h-screen text-dashboard-text xl:grid xl:grid-rows-[auto,1fr] xl:grid-cols-[auto,1fr]">
            <SidebarProvider>
                <Header />
                <Sidebar />
            </SidebarProvider>
            <div className="xl:row-start-2 xl:row-end-3 xl:col-start-2 xl:col-end-3">
                {children}
            </div>
        </main>
    );
}
