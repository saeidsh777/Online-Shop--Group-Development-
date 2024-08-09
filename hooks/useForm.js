import { useReducer } from 'react';

const changeHandler = (state, action) => {
    switch (action.type) {
        case 'SET_VALUE': {
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputID]: action.inputValue,
                },
            };
        }
    }
};

export const useForm = initInputs => {
    const [formState, dispatch] = useReducer(changeHandler, {
        inputs: initInputs,
    });

    const onChangeHandled = (inputID, inputValue) => {
        dispatch({
            type: 'SET_VALUE',
            inputValue,
            inputID,
        });
    };

    return [formState, onChangeHandled];
};
