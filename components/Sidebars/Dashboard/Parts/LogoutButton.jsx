import { IoExitOutline } from 'react-icons/io5';

const LogoutButton = () => {
    return (
        <div className="mt-auto md:py-1 md:px-2 border-t xl:px-4 Dashboard_Sidebar-LogoutButton">
            <div
                className={`py-2 pl-4 md:py-3 md:pl-5 xl:py-4 xl:px-4 cursor-pointer flex items-center gap-2 rounded Dashboard_Sidebar-logoutContainer transition-colors duration-300 text-[rgb(220,38,38)] hover:bg-[rgb(245,190,190)] hover:text-[rgb(211,28,28)]`}
            >
                <IoExitOutline className="iconFontSize" />
                <div className="xl:overflow-hidden xl:transition-all xl:duration-200 xl:max-w-96 xl:max-h-96 Dashboard_Sidebar-logoutText">
                    Logout
                </div>
            </div>
        </div>
    );
};
export default LogoutButton;
