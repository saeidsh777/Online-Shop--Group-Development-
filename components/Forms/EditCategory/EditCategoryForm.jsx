'use client';

import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useEditCategory from '@/hooks/useEditCategory';

const EditCategoryForm = ({ category, GoBackOnSuccess }) => {
    const { FieldButton, FieldsBox, Refs, formAction } = useEditCategory(
        category,
        GoBackOnSuccess
    );
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
                    ref={Refs.inputRef}
                    defaultValue={category.title}
                />

                {FieldButton}
            </div>
            {FieldsBox}
            <DashboardBTN
                ref={Refs.buttonRef}
                className="ml-auto disabled:bg-blue-400 disabled:cursor-wait mt-3"
                type="submit"
            >
                Save
            </DashboardBTN>
        </form>
    );
};
export default EditCategoryForm;
