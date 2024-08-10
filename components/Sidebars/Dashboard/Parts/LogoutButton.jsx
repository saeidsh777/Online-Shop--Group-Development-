import { IoExitOutline } from 'react-icons/io5';

const LogoutButton = () => {
    return (
        <div className="mt-auto md:py-1 md:px-2 border-t ">
            <div
                className={`py-2 pl-4 md:py-3 md:pl-5 xl:py-4 xl:pl-6 cursor-pointer flex items-center gap-2 rounded transition-colors duration-300 text-[rgb(220,38,38)] hover:bg-[rgb(245,190,190)] hover:text-[rgb(211,28,28)]`}
            >
                <IoExitOutline className="iconFontSize" />
                <div>Logout</div>
            </div>
        </div>
    );
};
export default LogoutButton;
