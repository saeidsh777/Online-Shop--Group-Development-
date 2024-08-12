const SidebarLinkSection = ({ children, title }) => {
    return (
        <div>
            <p className="font-roboto text-[#3e4853] text-[10px] 425:text-xs md:text-sm lg:text-base 1152:text-lg  uppercase Dashboard_Sidebar-linkSection 1152:overflow-hidden 1152:max-h-96">
                {title}
            </p>
            <div className="mt-1 flex flex-col gap-0.5">{children}</div>
        </div>
    );
};
export default SidebarLinkSection;
