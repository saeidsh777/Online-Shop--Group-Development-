'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLink = ({ href, text, children }) => {
    const pathName = usePathname();
    return (
        <Link
            className={`py-2 pl-4 md:py-3 md:pl-5 xl:py-4 xl:px-4 cursor-pointer flex items-center justify-start gap-2 rounded transition-colors duration-300 Dashboard_Sidebar-linkContainer ${
                pathName === href
                    ? 'text-dashboard-sidebar-textActive bg-dashboard-sidebar-bgActive hover:bg-dashboard-sidebar-bgActiveHover'
                    : 'text-dashboard-text hover:bg-dashboard-sidebar-hover'
            } `}
            href={href}
        >
            <div className="iconFontSize">{children}</div>
            <div className="xl:overflow-hidden xl:transition-all xl:duration-200 xl:max-w-full xl:max-h-full Dashboard_Sidebar-linktext">
                {text}
            </div>
        </Link>
    );
};
export default SidebarLink;
