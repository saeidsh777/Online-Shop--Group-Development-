const SidebarLinkSection = ({ children, title }) => {
    return (
        <div>
            <p className="font-roboto text-[#3e4853] text-[10px] 425:text-xs md:text-sm lg:text-base xl:text-lg  uppercase">
                {title}
            </p>
            <div className="mt-1 flex flex-col gap-0.5">{children}</div>
        </div>
    );
};
export default SidebarLinkSection;
