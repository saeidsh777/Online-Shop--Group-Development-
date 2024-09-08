import { useCallback } from 'react';
import toast from 'react-hot-toast';

const useResponse = () => {
    const responseHandler = useCallback(
        async (response, successtext, onError, onSuccess) => {
            if (typeof response === 'string') {
                onError && onError();
                toast.error(response);

                return;
            }

            if (response.ok) {
                toast.success(successtext);
                onSuccess && onSuccess();
                return;
            }
            onError && onError();

            // show error message with toast
            const { message } = await response.json();
            const error_message =
                typeof message === 'string' ? message : message[0];

            toast.error(error_message);
        },
        []
    );

    return responseHandler;
};
export default useResponse;
