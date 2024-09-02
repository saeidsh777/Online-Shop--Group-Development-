'use client';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useAddCategory from '@/hooks/useAddCategory';

const AddNewCategoryForm = () => {
    const { formAction, FieldButton, FieldsBox, Refs } = useAddCategory();

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
                />

                {FieldButton}
            </div>
            {FieldsBox}
            <DashboardBTN
                ref={Refs.buttonRef}
                className="ml-auto disabled:bg-blue-400 disabled:cursor-wait mt-3"
                type="submit"
            >
                Add Category
            </DashboardBTN>
        </form>
    );
};
export default AddNewCategoryForm;
