'use client';
import { deleteCategory } from '@/services/categories';
import { useRouter } from 'next/navigation';
import useResponse from './useResponse';
import useToken from './useToken';

const useDeleteCategory = () => {
    const responseHandler = useResponse();
    const Router = useRouter();

    const DeleteCategory = async id => {
        const Token = useToken();
        if (!Token) return;

        const response = await deleteCategory(id, Token);
        const onSuccess = () => {
            Router.refresh();
        };

        await responseHandler(
            response,
            'Category delete successfuly',
            undefined,
            onSuccess
        );
    };

    return DeleteCategory;
};
export default useDeleteCategory;
