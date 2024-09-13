const Thead = () => {
    return (
        <thead>
            <tr className="flex items-center">
                <th className="px-1 py-0.5 flex-[2.6] 425:flex-[2.6] md:flex-1">
                    Name
                </th>
                <th className="px-1 py-0.5 flex-[1.4] 425:flex-[1.6] md:flex-[0.75] ">
                    Tags
                </th>
                <th className="px-1 py-0.5 flex-1 max-w-16  425:max-w-20 lg:max-w-24 xl:max-w-28">
                    Optional
                </th>
                <th className="px-1 py-0.5 flex-1 max-w-16  425:max-w-20 lg:max-w-24 xl:max-w-28 max-sm:hidden">
                    Actions
                </th>
            </tr>
        </thead>
    );
};
export default Thead;
