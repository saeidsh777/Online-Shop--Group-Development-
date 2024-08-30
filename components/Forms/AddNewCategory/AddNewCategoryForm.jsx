'use client';

import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useAddCategory from '@/hooks/useAddCategory';
import useField from '@/hooks/useField';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import FieldButton from './Components/FieldButton/FieldButton';
import FieldsBox from './Components/FieldsBox';

const AddNewCategoryForm = () => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const AddCategory = useAddCategory();
    const { Fields, FieldsIsActive, Dispatchers } = useField();

    const formAction = event => {
        event.preventDefault();
        if (!inputRef.current) return;

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
                    className="p-3 sm:p-3.5 lg:p-4 lg:px-5 1152:px-6 1152:py-5 flex-1 my-1"
                    placeholder="Category Name..."
                    name="name"
                    ref={inputRef}
                />

                <FieldButton
                    IsActive={FieldsIsActive}
                    Add={Dispatchers.AddField}
                    Remove={Dispatchers.RemoveFields}
                />
            </div>

            {FieldsIsActive ? (
                <FieldsBox
                    {...{
                        AddField: Dispatchers.AddField,
                        fields: Fields,
                        ...Dispatchers.FieldDispatchers,
                    }}
                />
            ) : null}

            <DashboardBTN
                ref={buttonRef}
                className="ml-auto disabled:bg-blue-400 disabled:cursor-wait mt-3"
                type="submit"
            >
                Add Category
            </DashboardBTN>
        </form>
    );
};
export default AddNewCategoryForm;
