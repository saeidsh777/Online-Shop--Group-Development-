const BgOverlay = ({ isSidebarActive, CloseSidebar }) => {
    return (
        <div
            className={`fixed w-screen h-screen bg-black/20 top-0 left-0 transition-all duration-200 1152:hidden ${
                isSidebarActive ? 'z-10 opacity-100' : '-z-[1] opacity-0'
            }`}
            onClick={CloseSidebar}
        ></div>
    );
};
export default BgOverlay;
