import EditCategoryForm from '@/components/Forms/EditCategory/EditCategoryForm';
import InterceptorModalWrapper from '@/components/Wrappers/InterceptorModalWrapper';
import ModalProvider from '@/contexts/ModalProvider';
import RefreshPage from '@/hooks/RefreshPage';
import { getSingleCategory } from '@/services/categories';

const EditCategoryModal = async ({ params: { categoryID } }) => {
    const Category = await getSingleCategory(categoryID);

    if (typeof Category === 'string' || !Category.response.ok)
        return (
            <InterceptorModalWrapper>
                <RefreshPage />
            </InterceptorModalWrapper>
        );

    return (
        <ModalProvider>
            <InterceptorModalWrapper>
                <EditCategoryForm category={Category.result} GoBackOnSuccess />
            </InterceptorModalWrapper>
        </ModalProvider>
    );
};
export default EditCategoryModal;
