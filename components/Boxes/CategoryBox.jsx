const CategoryBox = ({ name, children }) => {
    return (
        <div className="flex flex-col categroy">
            <label
                className="rounded-lg rounded-b-none bg-gray-100 p-2 pb-0 uppercase font-semibold flex items-center justify-between cursor-pointer categroyLable transition-all duration-300 translate-y-0.5"
                htmlFor={name}
            >
                {name}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="aspect-square w-4 425:w-5 lg:w-6 xl:w-[26px] transition-all duration-300 -rotate-90"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        className="stroke-dashboard-text stroke-[2]"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
                    ></path>
                </svg>
            </label>
            <input type="checkbox" name={name} id={name} className="hidden" />
            <div className="border border-transparent max-h-0 overflow-hidden bg-transparent categoryBody">
                <div className="p-1 px-3">{children}</div>
            </div>
            <div className="bg-gray-100 rounded-lg rounded-t-none w-full h-2 categoryFooter"></div>
        </div>
    );
};
export default CategoryBox;
