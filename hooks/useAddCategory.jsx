import FieldButtonComponent from '@/components/Forms/AddNewCategory/Components/FieldButton/FieldButton';
import FieldsBoxComponent from '@/components/Forms/AddNewCategory/Components/FieldsBox';
import { addCategory as postCategory } from '@/services/categories';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import useField from './useField';
import useResponse from './useResponse';
import useToken from './useToken';

const useAddCategory = () => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const { Fields, FieldsIsActive, Dispatchers } = useField();
    const responseHandler = useResponse();

    const AddCategory = async (Data, onSuccess, onError) => {
        const Token = useToken();
        if (!Token) return;

        const response = await postCategory(Data, Token);

        const successText = Data.title + ' category added successfully';
        await responseHandler(response, successText, onError, onSuccess);
    };

    const formAction = event => {
        event.preventDefault();
        if (!inputRef.current) return;

        const activeButtonHandler = () => {
            buttonRef.current.disabled = false;
        };

        const onSuccess = () => {
            inputRef.current.value = '';
            Dispatchers.RemoveFields();
            activeButtonHandler();
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

        AddCategory(Data, onSuccess, activeButtonHandler);
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
export default useAddCategory;
