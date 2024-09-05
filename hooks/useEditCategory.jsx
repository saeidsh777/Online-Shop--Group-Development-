import FieldButtonComponent from '@/components/Forms/AddNewCategory/Components/FieldButton/FieldButton';
import FieldsBoxComponent from '@/components/Forms/AddNewCategory/Components/FieldsBox';
import { updateCategory } from '@/services/categories';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import useField from './useField';
import useResponse from './useResponse';
import Revalidate from './useRevalidate';
import useToken from './useToken';

const useEditCategory = (defaultValue, GoBackOnSuccess) => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const Router = useRouter();
    const { Fields, FieldsIsActive, Dispatchers } = useField(defaultValue);
    const responseHandler = useResponse();

    const UpdateCategory = async (id, Data, success, error) => {
        const Token = useToken();
        if (!Token) return;

        const response = await updateCategory(Data, id, Token);
        const successText = Data.title + ' category updated successfully';
        await responseHandler(response, successText, error, success);
    };

    const FieldButton = (
        <FieldButtonComponent
            IsActive={FieldsIsActive}
            Add={Dispatchers.AddField}
            Remove={Dispatchers.RemoveFields}
        />
    );

    const FieldsBox = FieldsIsActive ? (
        <FieldsBoxComponent
            {...{
                AddField: Dispatchers.AddField,
                fields: Fields,
                ...Dispatchers.FieldDispatchers,
            }}
        />
    ) : null;

    const formAction = event => {
        event.preventDefault();
        if (!inputRef.current) return;

        const activeButtonHandler = () => {
            buttonRef.current.disabled = false;
        };

        const onSuccess = () => {
            Revalidate('/dashboard/categories/');
            Revalidate('/dashboard/categories/' + defaultValue._id);

            if (GoBackOnSuccess) {
                Router.back();
            } else {
                Router.push('/dashboard/categories/');
            }
        };

        const title = inputRef.current.value;
        buttonRef.current.disabled = true;

        // check title
        if (!title) {
            toast.error('You cannot add a category with an empty name');
            activeButtonHandler();
            return;
        }
        if (title.length < 3 || title.length > 30) {
            toast.error(
                'Category name must contain at least 3 and up to 30 maximum charachter'
            );
            activeButtonHandler();
            return;
        }

        // check fields
        const FormatedFields = Dispatchers.FieldsFormater(Fields);
        if (FormatedFields === 'Error') {
            toast.error(
                'You cannot add a field with an empty name \nPlease select a name for the fields underlined in red'
            );
            activeButtonHandler();
            return;
        }

        const Data = { title };
        if (FormatedFields.length) {
            Data.productVariantsSchema = FormatedFields;
        }

        UpdateCategory(defaultValue._id, Data, onSuccess, activeButtonHandler);
    };

    return {
        formAction,
        FieldButton,
        FieldsBox,
        Refs: {
            inputRef,
            buttonRef,
        },
    };
};
export default useEditCategory;
