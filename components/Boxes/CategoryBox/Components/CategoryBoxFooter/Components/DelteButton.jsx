'use client';
import useDeleteCategory from '@/hooks/useDeleteCategory';
import { DeleteWrapper } from '@/hooks/useModal';

const DelteButton = ({ children, categoryID, categoryName }) => {
    const DeleteCategory = useDeleteCategory();

    return (
        <DeleteWrapper
            text={`This action delete ${categoryName} category permanently! Are you sure?`}
            func={async () => {
                await DeleteCategory(categoryID);
            }}
        >
            {children}
        </DeleteWrapper>
    );
};
export default DelteButton;
