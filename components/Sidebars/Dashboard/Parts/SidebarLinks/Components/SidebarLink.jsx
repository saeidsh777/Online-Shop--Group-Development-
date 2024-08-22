import IsLinkActive from '@/hooks/IsLinkActive';
import Link from 'next/link';

const SidebarLink = ({ href: hrefProps, text, children }) => {
    const href = '/dashboard' + (hrefProps === '/' ? '' : hrefProps);
    return (
        <Link
            className={`py-2 pl-4 md:py-3 md:pl-5 1152:py-4 1152:px-4 cursor-pointer flex items-center justify-start gap-2 rounded-xl group transition-colors duration-300 Dashboard_Sidebar-linkContainer ${
                IsLinkActive(href)
                    ? 'text-dashboard-sidebar-textActive bg-dashboard-sidebar-bgActive hover:bg-dashboard-sidebar-bgActiveHover'
                    : 'text-dashboard-text hover:bg-dashboard-sidebar-hover'
            } `}
            href={href}
        >
            <div className="iconFontSize">{children}</div>
            <div className="Dashboard_Sidebar-linktext">
                <div className="relative">
                    <div className="text">{text}</div>
                    <div className="leftArrow max-1152:hidden"></div>
                </div>
            </div>
        </Link>
    );
};
export default SidebarLink;
