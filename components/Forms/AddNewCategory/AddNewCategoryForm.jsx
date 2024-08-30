'use client';

import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useAddCategory from '@/hooks/useAddCategory';
import { useCallback, useReducer, useRef } from 'react';
import toast from 'react-hot-toast';
import FieldButton from './Components/FieldButton/FieldButton';
import FieldsBox from './Components/FieldsBox';

const reducerFunc = (state, action) => {
    switch (action.type) {
        case 'ADD_FIELD':
            const newField = {
                id: new Date().getTime(),
                name: '',
                isOptional: false,
                tags: [],
            };
            return [...state, newField];
        case 'REMOVE_FIELDS':
            return [];
        case 'REMOVE_FIELD':
            return state.filter(field => field.id !== action.payload);
        case 'CHANGE_NAME':
            return state.map(field => {
                if (field.id === action.payload.id) {
                    field.name = action.payload.value;
                }
                return field;
            });
        case 'CHANGE_OPTIONAL_STATUS':
            return state.map(field => {
                if (field.id === action.payload.id) {
                    field.isOptional = action.payload.value;
                }
                return field;
            });
        case 'RESET_FIELD':
            return state.map(field => {
                if (field.id === action.payload) {
                    field = {
                        id: action.payload,
                        name: '',
                        isOptional: false,
                        tags: [],
                    };
                }
                return field;
            });
        default:
            return state;
    }
};

const AddNewCategoryForm = () => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const AddCategory = useAddCategory();
    const [data, dispatch] = useReducer(reducerFunc, []);

    const AddField = useCallback(() => {
        dispatch({ type: 'ADD_FIELD' });
    }, [dispatch]);

    const RemoveFields = useCallback(() => {
        dispatch({ type: 'REMOVE_FIELDS' });
    }, [dispatch]);

    const FieldDispatchers = {
        ChangeName: useCallback(
            (id, value) => {
                dispatch({
                    type: 'CHANGE_NAME',
                    payload: { id, value },
                });
            },
            [dispatch]
        ),
        ToggleOptional: useCallback(
            ({ target: { checked } }, id) => {
                dispatch({
                    type: 'CHANGE_OPTIONAL_STATUS',
                    payload: {
                        id,
                        value: checked,
                    },
                });
            },
            [dispatch]
        ),
        Remove: useCallback(
            id => {
                dispatch({ type: 'REMOVE_FIELD', payload: id });
            },
            [dispatch]
        ),
        Reset: useCallback(
            id => {
                dispatch({
                    type: 'RESET_FIELD',
                    payload: id,
                });
            },
            [dispatch]
        ),
    };

    const formAction = event => {
        event.preventDefault();
        if (!inputRef.current) return;

        const title = inputRef.current.value;
        buttonRef.current.disabled = true;

        // check title
        if (!title) return;
        if (title.length < 3 || title.length > 30) {
            toast.error(
                'Category name must contain at least 3 and up to 30 maximum charachter'
            );
            return;
        }

        const activeButtonHandler = () => {
            buttonRef.current.disabled = false;
        };

        const onSuccess = () => {
            inputRef.current.value = '';
            activeButtonHandler();
        };

        AddCategory(title, onSuccess, activeButtonHandler);
    };
    return (
        <form
            onSubmit={formAction}
            className="flex flex-col items-start gap-2.5 md:gap-3 1152:gap-4"
        >
            <div className="flex items-center w-full gap-1">
                <DashboardInput
                    className="p-3 sm:p-3.5 lg:p-4 lg:px-5 1152:px-6 1152:py-5 flex-1 my-1"
                    placeholder="Category Name..."
                    name="name"
                    ref={inputRef}
                />

                <FieldButton
                    Length={data.length}
                    Add={AddField}
                    Remove={RemoveFields}
                />
            </div>

            {data.length ? (
                <FieldsBox
                    {...{
                        AddField,
                        fields: data,
                        ...FieldDispatchers,
                    }}
                />
            ) : null}

            <DashboardBTN
                ref={buttonRef}
                className="ml-auto disabled:bg-blue-400 disabled:cursor-wait mt-3"
                type="submit"
            >
                Add Category
            </DashboardBTN>
        </form>
    );
};
export default AddNewCategoryForm;
