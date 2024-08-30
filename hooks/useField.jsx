import { useCallback, useReducer } from 'react';

const useField = () => {
    const Reducer = useCallback((state, action) => {
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
            case 'ADD_TAG':
                return state.map(field => {
                    if (field.id === action.payload.id) {
                        field.tags = [
                            ...new Set([...field.tags, action.payload.tag]),
                        ];
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
    }, []);

    const [Fields, Dispatch] = useReducer(Reducer, []);

    const AddField = useCallback(() => {
        Dispatch({ type: 'ADD_FIELD' });
    }, []);

    const RemoveFields = useCallback(() => {
        Dispatch({ type: 'REMOVE_FIELDS' });
    }, []);

    const FieldDispatchers = {
        ChangeName: useCallback((id, value) => {
            Dispatch({
                type: 'CHANGE_NAME',
                payload: { id, value },
            });
        }, []),
        AddTag: useCallback((tag, id) => {
            Dispatch({ type: 'ADD_TAG', payload: { id, tag } });
        }, []),
        ToggleOptional: useCallback(({ target: { checked } }, id) => {
            Dispatch({
                type: 'CHANGE_OPTIONAL_STATUS',
                payload: {
                    id,
                    value: checked,
                },
            });
        }, []),
        Remove: useCallback(id => {
            Dispatch({ type: 'REMOVE_FIELD', payload: id });
        }, []),
        Reset: useCallback(id => {
            Dispatch({
                type: 'RESET_FIELD',
                payload: id,
            });
        }, []),
    };

    return {
        Fields,
        FieldsIsActive: Fields.length,
        Dispatchers: {
            AddField,
            RemoveFields,
            FieldDispatchers,
        },
    };
};
export default useField;
