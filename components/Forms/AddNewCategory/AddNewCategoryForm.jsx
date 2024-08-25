'use client';

import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useAddCategory from '@/hooks/useAddCategory';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const AddNewCategoryForm = () => {
    const inputRef = useRef(null);
    const AddCategory = useAddCategory();

    const formAction = event => {
        event.preventDefault();
        const title = inputRef.current.value;

        // check title
        if (!title) return;
        if (title.length < 3 || title.length > 30) {
            toast.error(
                'Category name must contain at least 3 and up to 30 maximum charachter'
            );
            return;
        }

        const resetInputHandler = () => {
            inputRef.current.value = '';
        };

        AddCategory(title, resetInputHandler);
    };
    return (
        <form
            onSubmit={formAction}
            className="flex flex-col items-start gap-2.5 md:gap-3 1152:gap-4"
        >
            <DashboardInput
                className="p-3 sm:p-3.5 lg:p-4 lg:px-5 1152:px-6 1152:py-5"
                placeholder="Category Name..."
                name="name"
                ref={inputRef}
            />
            <DashboardBTN className="ml-auto">Add</DashboardBTN>
        </form>
    );
};
export default AddNewCategoryForm;
