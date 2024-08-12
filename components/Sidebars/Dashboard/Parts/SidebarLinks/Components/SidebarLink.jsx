'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLink = ({ href: hrefProps, text, children, linkClicked }) => {
    const pathName = usePathname();
    const href = '/dashboard' + (hrefProps === '/' ? '' : hrefProps);
    const isPageLive = pathName === href;
    return (
        <Link
            className={`py-2 pl-4 md:py-3 md:pl-5 1152:py-4 1152:px-4 cursor-pointer flex items-center justify-start gap-2 rounded transition-colors duration-300 Dashboard_Sidebar-linkContainer ${
                isPageLive
                    ? 'text-dashboard-sidebar-textActive bg-dashboard-sidebar-bgActive hover:bg-dashboard-sidebar-bgActiveHover'
                    : 'text-dashboard-text hover:bg-dashboard-sidebar-hover'
            } `}
            href={href}
            onClick={linkClicked}
        >
            <div className="iconFontSize">{children}</div>
            <div className="1152:overflow-hidden 1152:transition-all 1152:duration-200 1152:max-w-full 1152:max-h-full Dashboard_Sidebar-linktext">
                {text}
            </div>
        </Link>
    );
};
export default SidebarLink;
