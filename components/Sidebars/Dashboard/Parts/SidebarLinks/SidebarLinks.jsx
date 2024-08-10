import SidebarLink from './Components/SidebarLink';
import SidebarLinkSection from './Components/SidebarLinkSection';

const SidebarLinks = () => {
    return (
        <div className="mt-1 flex flex-col gap-1 overflow-y-auto xl:overflow-x-hidden px-4 Dashboard_Sidebar-SidebarLinks">
            {/* these are just for test */}
            {/*
                use children to pass icon and use
                react-icons instead of SVGs
            */}
            <SidebarLinkSection title={'test2'}>
                <SidebarLink href={'/'} text={'Dashboard'}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            opacity=".4"
                            d="m20.04 6.822-5.76-4.03c-1.57-1.1-3.98-1.04-5.49.13l-5.01 3.91c-1 .78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.62 4.63h10.78c2.55 0 4.62-2.07 4.62-4.62v-6.78c0-1.35-.87-3.01-1.97-3.78Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M16.83 11.27a.707.707 0 0 0-.38-.38.646.646 0 0 0-.27-.05h-1.86c-.39 0-.7.31-.7.7 0 .39.31.7.7.7h.18l-2.11 2.11-1.02-1.52a.712.712 0 0 0-.51-.31.676.676 0 0 0-.56.2L7.32 15.7c-.27.27-.27.71 0 .99.14.14.31.2.49.2s.36-.07.49-.2l2.38-2.38 1.02 1.52c.12.17.3.29.51.31.22.02.41-.05.56-.2l2.72-2.72v.18c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-1.86a.764.764 0 0 0-.06-.27Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </SidebarLink>
                <SidebarLink href={'/test'} text={'test'}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            opacity=".4"
                            d="m20.04 6.822-5.76-4.03c-1.57-1.1-3.98-1.04-5.49.13l-5.01 3.91c-1 .78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.62 4.63h10.78c2.55 0 4.62-2.07 4.62-4.62v-6.78c0-1.35-.87-3.01-1.97-3.78Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M16.83 11.27a.707.707 0 0 0-.38-.38.646.646 0 0 0-.27-.05h-1.86c-.39 0-.7.31-.7.7 0 .39.31.7.7.7h.18l-2.11 2.11-1.02-1.52a.712.712 0 0 0-.51-.31.676.676 0 0 0-.56.2L7.32 15.7c-.27.27-.27.71 0 .99.14.14.31.2.49.2s.36-.07.49-.2l2.38-2.38 1.02 1.52c.12.17.3.29.51.31.22.02.41-.05.56-.2l2.72-2.72v.18c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-1.86a.764.764 0 0 0-.06-.27Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </SidebarLink>
            </SidebarLinkSection>
        </div>
    );
};
export default SidebarLinks;
