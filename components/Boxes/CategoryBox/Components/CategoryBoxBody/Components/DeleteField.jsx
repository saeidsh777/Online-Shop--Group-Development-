'use client';
import useDeleteCategoryFiled from '@/hooks/useDeleteCategoryFiled';
import { DeleteWrapper } from '@/hooks/useModal';

const DeleteField = ({ children, name, id: feildID, Category }) => {
    const DeleteField = useDeleteCategoryFiled();
    return (
        <DeleteWrapper
            text={`This action delete ${name} permanently!
Are you sure?`}
            func={async () => {
                DeleteField(Category, feildID);
            }}
        >
            {children}
        </DeleteWrapper>
    );
};
export default DeleteField;
