'use client';

import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useAddCategory from '@/hooks/useAddCategory';
import { useReducer, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { CiCirclePlus, CiSquarePlus } from 'react-icons/ci';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';

const reducerFunc = (state, action) => {
    switch (action.type) {
        case value:
            break;

        default:
            return state;
    }
};

const AddNewCategoryForm = () => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const AddCategory = useAddCategory();
    const [data, dispatch] = useReducer(reducerFunc, []);
    const [isChecked, setChecked] = useState(false);

    const formAction = event => {
        event.preventDefault();
        const title = inputRef.current.value;
        buttonRef.current.disabled = true;

        // check title
        if (!title) return;
        if (title.length < 3 || title.length > 30) {
            toast.error(
                'Category name must contain at least 3 and up to 30 maximum charachter'
            );
            return;
        }

        const activeButtonHandler = () => {
            buttonRef.current.disabled = false;
        };

        const onSuccess = () => {
            inputRef.current.value = '';
            activeButtonHandler();
        };

        AddCategory(title, onSuccess, activeButtonHandler);
    };
    return (
        <form
            onSubmit={formAction}
            className="flex flex-col items-start gap-2.5 md:gap-3 1152:gap-4"
        >
            <div className="flex items-center w-full gap-1">
                <DashboardInput
                    className="p-3 sm:p-3.5 lg:p-4 lg:px-5 1152:px-6 1152:py-5 flex-1"
                    placeholder="Category Name..."
                    name="name"
                    ref={inputRef}
                />
                <div className="w-1/3 425:w-3/12 md:w-1/5">
                    <button className="flex items-center m-auto  justify-center gap-2 text-dashboard-sidebar-textActive border rounded-lg transition-all duration-300 border-transparent hover:border-dashboard-sidebar-textActive hover:py-2 hover:px-1 425:hover:py-2.5 sm:hover:py-3 lg:hover:py-3.5 sm:hover:px-2 md:hover:px-2.5 lg:hover:px-3">
                        <CiCirclePlus className="iconFontSize" /> Add fields
                    </button>
                    <button className="flex items-center m-auto  justify-center gap-2 text-red-500 border rounded-lg transition-all duration-300 border-transparent hover:border-red-500 hover:py-2 hover:px-1 425:hover:py-2.5 sm:hover:py-3 lg:hover:py-3.5 sm:hover:px-2 md:hover:px-2.5 lg:hover:px-3">
                        Remove fields
                    </button>
                </div>
            </div>
            <DashboardBox className="w-full border-dashed">
                <table className="w-full">
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
                        </tr>
                    </thead>
                    <tbody className="flex flex-col gap-2 mt-2">
                        <tr className="flex items-center border-b pb-1">
                            <td className="px-1 py-0.5 flex-[2.6] 425:flex-[2.6] md:flex-1  flex items-center justify-center">
                                <DashboardInput
                                    className="p-2 sm:p-2.5 lg:p-3 lg:px-5 1152:px-6 1152:py-5 flex-1 ring-0 shadow-none text-center "
                                    placeholder="Field name..."
                                    name="name"
                                    ref={inputRef}
                                />
                            </td>
                            <td className="px-1 py-0.5 flex-[1.4] 425:flex-[1.6] md:flex-[0.75]  flex items-center justify-center">
                                <div className="flex flex-wrap gap-1">
                                    <p className="whitespace-nowrap flex items-center cursor-pointer text-dashboard-sidebar-textActive grow">
                                        <CiSquarePlus className="iconFontSize" />{' '}
                                        Tag
                                    </p>
                                </div>
                            </td>
                            <td className="px-1 py-0.5 flex-1 max-w-16  425:max-w-20 lg:max-w-24 xl:max-w-28 flex items-center justify-center">
                                <label
                                    htmlFor="optionalFild"
                                    className="cursor-pointer"
                                >
                                    {isChecked ? (
                                        <MdOutlineCheckBox className="iconFontSize text-dashboard-sidebar-textActive" />
                                    ) : (
                                        <MdCheckBoxOutlineBlank className="iconFontSize text-dashboard-title/20" />
                                    )}
                                </label>
                                <input
                                    type="checkbox"
                                    id="optionalFild"
                                    value={isChecked}
                                    className="hidden"
                                    onChange={e => {
                                        setChecked(e.target.checked);
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="text-center pt-3">
                                <button className="flex items-center m-auto  justify-center gap-2 text-dashboard-sidebar-textActive/80 transition-colors duration-300  hover:text-dashboard-sidebar-textActive">
                                    <CiCirclePlus className="iconFontSize" />{' '}
                                    Add more
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {/* <div className="flex justify-between gap-1.5">
                    <div className="px-1 py-0.5 flex-1 max-w-72">
                        <div className="flex justify-center w-full mb-1">
                            <p>Name</p>
                        </div>
                        <DashboardInput
                            className="p-2 sm:p-2.5 lg:p-3 lg:px-5 1152:px-6 1152:py-5"
                            placeholder="Field name..."
                            name="name"
                            ref={inputRef}
                        />
                    </div>
                    <div className="px-1 py-0.5 max-w-[30%]">
                        <div className="flex justify-center w-full mb-1">
                            <p>Tags</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            <p className="whitespace-nowrap flex items-center cursor-pointer text-dashboard-sidebar-textActive grow">
                                <CiSquarePlus className="iconFontSize" /> Tag
                            </p>
                        </div>
                    </div>
                    <div className="px-1 py-0.5 w-fit flex flex-col items-center">
                        <div className="flex justify-center w-full mb-1">
                            <label htmlFor="optionalFild">Optional</label>
                        </div>
                        <div>
                            <label
                                htmlFor="optionalFild"
                                className="cursor-pointer"
                            >
                                {isChecked ? (
                                    <MdOutlineCheckBox className="iconFontSize text-dashboard-sidebar-textActive" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="iconFontSize text-dashboard-title/20" />
                                )}
                            </label>
                            <input
                                type="checkbox"
                                id="optionalFild"
                                value={isChecked}
                                className="hidden"
                                onChange={e => {
                                    setChecked(e.target.checked);
                                }}
                            />
                        </div>
                    </div>
                </div> */}
            </DashboardBox>
            <DashboardBTN
                ref={buttonRef}
                className="ml-auto disabled:bg-blue-400 disabled:cursor-wait"
            >
                Add Category
            </DashboardBTN>
        </form>
    );
};
export default AddNewCategoryForm;
