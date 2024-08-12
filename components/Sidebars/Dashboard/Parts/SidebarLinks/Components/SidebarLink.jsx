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
            <div className="1152:max-w-96 1152:max-h-96 Dashboard_Sidebar-linktext 1152:line-clamp-1">
                {text}
            </div>
        </Link>
    );
};
export default SidebarLink;
