'use client';
import { updateCategory } from '@/services/categories';
import { useRouter } from 'next/navigation';
import useResponse from './useResponse';
import useToken from './useToken';

const useDeleteCategoryFiled = () => {
    const Router = useRouter();
    const responseHandler = useResponse();

    const RemoveFieldAndFormatCategory = (
        { title, productVariantsSchema },
        id
    ) => {
        let newCategory = {
            title,
            productVariantsSchema: [],
        };

        productVariantsSchema.forEach(
            ({ variantName, optional, variantOptions, _id }) => {
                if (_id === id) return;

                let newFeild = {
                    variantName,
                    variantOptions: variantOptions,
                };

                if (optional) {
                    newFeild.optional = optional;
                }

                newCategory.productVariantsSchema.push(newFeild);
            }
        );

        return newCategory;
    };

    const FindFeildName = (category, FieldID) => {
        const field = category.productVariantsSchema.find(
            feild => feild._id === FieldID
        );

        return field['variantName'];
    };

    const DeleteField = async (Category, FieldID) => {
        const Token = useToken();
        if (!Token) return;

        const FeildName = FindFeildName(Category, FieldID);
        const newCategory = RemoveFieldAndFormatCategory(Category, FieldID);

        const response = await updateCategory(newCategory, Category._id, Token);

        const onSuccess = () => {
            Router.refresh();
        };

        const successText = FeildName + 'category has been deleted successfuly';

        await responseHandler(response, successText, undefined, onSuccess);
    };
    return DeleteField;
};
export default useDeleteCategoryFiled;
