'use client';
import useDeleteCategory from '@/hooks/useDeleteCategory';
import { DeleteWrapper } from '@/hooks/useModal';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import Tfoot from '../Forms/AddNewCategory/Components/Table/Tfoot/Tfoot';
import ActionIcon from '../Table/ActionIcons';

const CategoryBox = ({
    title,
    productVariantsSchema: Schemas,
    _id: categoryID,
}) => {
    const DeleteCategory = useDeleteCategory();
    return (
        <div className="flex flex-col categroy shadow-md rounded-lg border border-gray-100 transition-all duration-300">
            <label
                className="rounded-lg rounded-b-none border  border-transparent p-2 pt-1 425:pt-2 md:pt-4 md:p-3 lg:px-3.5 pb-0 md:pb-1 lg:pb-2 font-semibold flex items-center justify-between categroyLable transition-all duration-300 translate-y-0.5 cursor-pointer"
                htmlFor={title}
            >
                <span className="uppercase">{title}</span>

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

            <input type="checkbox" name={title} id={title} className="hidden" />
            <div className="max-h-0 overflow-y-hidden bg-transparent categoryBody relative overflow-x-hidden">
                <div className="w-full">
                    <table cellSpacing={'500'} className="w-full">
                        <thead className="uppercase bg-gray-100 text-[68%] 896:text-[75%] xl:text-[85%] text-dashboard-title/85 font-medium border-b">
                            <tr className="text-center bg-gray-100 sticky top-0 z-[2]">
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
                                    <tr
                                        key={field.id}
                                        className={`text-center hover:bg-dashboard-sidebar-bgActiveHover ${
                                            Schemas.length !== index + 1
                                                ? 'border-b'
                                                : ''
                                        }`}
                                    >
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            {index + 1}
                                        </td>
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5 capitalize font-semibold">
                                            {field.variantName}
                                        </td>
                                        <td className="p-1 425:p-1.5 md:p-2 lg:p-2.5">
                                            <div className="flex flex-wrap gap-1">
                                                {field.variantOptions.map(
                                                    option => (
                                                        <div
                                                            className="bg-gray-200/75 rounded-lg py-1 px-2 grow text-center relative group overflow-hidden  flex items-center justify-center gap-1.5"
                                                            key={option}
                                                        >
                                                            {option}
                                                        </div>
                                                    )
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
                                                <ActionIcon type={'update'}>
                                                    <path
                                                        d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
                                                        strokeWidth="1.5"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"
                                                        strokeWidth="1.5"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                </ActionIcon>

                                                <DeleteWrapper
                                                    text={`This action delete ${field.variantName} permanently!
                                                    Are you sure?`}
                                                    func={async () => {
                                                        // add how to delete the product
                                                    }}
                                                >
                                                    <ActionIcon type={'delete'}>
                                                        <path
                                                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                    </ActionIcon>
                                                </DeleteWrapper>
                                            </div>
                                        </td>
                                    </tr>
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
                        <Tfoot col={5} />
                    </table>
                </div>
            </div>
            <div className="rounded-lg rounded-t-none w-full py-1 categoryFooter shadow-sm md:py-1.5 max-h-0 max-w-0  overflow-hidden ">
                <div className="flex items-center justify-evenly w-full">
                    <div className="flex items-center gap-1 cursor-pointer pl-1 pr-3 rounded-lg text-[#2563eb] hover:bg-blue-200">
                        <ActionIcon type={'update'} tooltip={false}>
                            <path
                                d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </ActionIcon>
                        Edit Category
                    </div>
                    <DeleteWrapper
                        text={`This action delete ${title} category permanently! Are you sure?`}
                        func={async () => {
                            await DeleteCategory(categoryID);
                        }}
                    >
                        <div className="flex items-center gap-1 cursor-pointer pl-1 pr-3 rounded-lg text-[#dc2626] hover:bg-red-200">
                            <ActionIcon type={'delete'} tooltip={false}>
                                <path
                                    d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </ActionIcon>
                            Delete Category
                        </div>
                    </DeleteWrapper>
                </div>
            </div>
        </div>
    );
};
export default CategoryBox;
