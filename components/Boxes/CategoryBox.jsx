const CategoryBox = ({ title, productVariantsSchema }) => {
    const hasSchema = Boolean(productVariantsSchema.length);

    return (
        <div className="flex flex-col categroy shadow-md rounded-lg border border-gray-100 transition-all duration-300">
            <label
                className={`rounded-lg rounded-b-none border  border-transparent p-2 pt-1 425:pt-2 md:p-3 lg:p-3.5 pb-0 md:pb-1 lg:pb-2 font-semibold flex items-center justify-between categroyLable transition-all duration-300 translate-y-0.5 ${
                    hasSchema ? 'cursor-pointer' : ''
                }`}
                htmlFor={title}
            >
                <span className="uppercase">{title}</span>
                {hasSchema ? (
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
                ) : (
                    <span>No field</span>
                )}
            </label>
            {hasSchema ? (
                <>
                    <input
                        type="checkbox"
                        name={title}
                        id={title}
                        defaultChecked={true}
                        className="hidden"
                    />
                    <div className="max-h-0 overflow-hidden bg-transparent categoryBody">
                        <div className="w-full">
                            <table cellSpacing={'500'} className="w-full">
                                <thead>
                                    <tr className="capitalize border-b text-center bg-gray-100">
                                        <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            #
                                        </th>
                                        <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            name
                                        </th>
                                        <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            values
                                        </th>
                                        <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            is optional
                                        </th>
                                        <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            acions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center hover:bg-dashboard-sidebar-bgActiveHover">
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            1
                                        </td>
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            test
                                        </td>
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            1
                                        </td>
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            1
                                        </td>
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            1
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : null}
            <div className="rounded-lg rounded-t-none w-full h-2 categoryFooter shadow-sm md:h-2 lg:h-2.5"></div>
        </div>
    );
};
export default CategoryBox;
