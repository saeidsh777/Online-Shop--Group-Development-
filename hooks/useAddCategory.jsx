import { addCategory as postCategory } from '@/services/categories';
import toast from 'react-hot-toast';

const useAddCategory = () => {
    const AddCategory = async (title, onSuccess, onError) => {
        const Token = localStorage.getItem('token');

        if (!Token) {
            alert('Token not found please login/register first');
            return;
        }

        const response = await postCategory(title, Token);
        if (response.ok) {
            toast.success(title + ' category added successfully');
            onSuccess();
            return;
        }
        onError();

        // show error message with toast
        const { message } = await response.json();
        const error_message =
            typeof message === 'string' ? message : message[0];

        toast.error(error_message);
    };

    return AddCategory;
};
export default useAddCategory;
