import Tooltip from '@/components/Others/Tooltip';
import ActionIcon from '@/components/Table/ActionIcons';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import DeleteField from './Components/DeleteField';

const TableRow = ({ index, RowLength, Category, ...field }) => {
    return (
        <tr
            className={`text-center hover:bg-dashboard-sidebar-bgActiveHover ${
                RowLength !== index + 1 ? 'border-b' : ''
            }`}
        >
            <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">{index + 1}</td>
            <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5 capitalize font-semibold">
                {field.variantName}
            </td>
            <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                <div className="flex flex-wrap gap-1">
                    {field.variantOptions.length ? (
                        field.variantOptions.map(option => (
                            <div
                                className="bg-gray-200/75 rounded-lg py-1 px-2 grow text-center relative group overflow-hidden  flex items-center justify-center gap-1.5"
                                key={option}
                            >
                                {option}
                            </div>
                        ))
                    ) : (
                        <div className="mx-auto">
                            <Tooltip
                                text={'It could be any string'}
                                TooltipClass="w-40"
                            >
                                <span className="font-light uppercase cursor-pointer">
                                    Not bounded
                                </span>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </td>
            <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                <div className="flex justify-center ">
                    {field.optional ? (
                        <MdOutlineCheckBox className="iconFontSize text-dashboard-sidebar-textActive" />
                    ) : (
                        <MdCheckBoxOutlineBlank className="iconFontSize text-dashboard-text/50" />
                    )}
                </div>
            </td>
            <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                <div className="flex justify-center items-center">
                    <DeleteField
                        name={field.variantName}
                        id={field.id}
                        Category={Category}
                    >
                        <ActionIcon type={'delete'}>
                            <path
                                d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </ActionIcon>
                    </DeleteField>
                </div>
            </td>
        </tr>
    );
};

const CategoryBoxBody = ({ Schemas, Category }) => {
    return (
        <div className="max-h-0 overflow-y-hidden bg-transparent categoryBody relative overflow-x-hidden">
            <div className="w-full">
                <table className="w-full">
                    <thead className="uppercase bg-gray-100 text-[68%] 896:text-[75%] xl:text-[85%] text-dashboard-title/85 font-medium border-b">
                        <tr className="text-center bg-gray-100 sticky top-0 z-[2]">
                            <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">#</th>
                            <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                name
                            </th>
                            <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                values
                            </th>
                            <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                optional
                            </th>
                            <th className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                acions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-[80%] 896:text-[85%] xl:text-[95%] border-b">
                        {Schemas.length ? (
                            Schemas.map((field, index) => (
                                <TableRow
                                    key={field._id}
                                    index={index}
                                    RowLength={Schemas.length}
                                    {...field}
                                    Category={Category}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-2 uppercase"
                                >
                                    NO field
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default CategoryBoxBody;
