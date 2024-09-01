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
            case 'REMOVE_TAG':
                return state.map(field => {
                    if (field.id === action.payload.id) {
                        field.tags = [...field.tags].filter(
                            tag => tag !== action.payload.tag
                        );
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
            case 'ADD_ERROR':
                return state.map(field => {
                    if (field.id === action.payload.id) {
                        field.error = true;
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
        RemovTag: useCallback((tag, id) => {
            Dispatch({ type: 'REMOVE_TAG', payload: { id, tag } });
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

    const FieldsFormater = useCallback(fields => {
        const SingleFieldErrorCatcher = field => {
            if (field.name) return false;

            Dispatch({ type: 'ADD_ERROR', payload: { id: field.id } });
            return true;
        };

        const FormatedData = fields.map(field => {
            const HasError = SingleFieldErrorCatcher(field);
            if (HasError) {
                return 'Error';
            }

            let fieldObj = {};
            if ('name' in field && field.name) {
                fieldObj.variantName = field.name;
            }
            if ('isOptional' in field && field.isOptional) {
                fieldObj.optional = true;
            }
            if ('tags' in field && field.tags.length) {
                fieldObj.variantOptions = field.tags;
            }

            return fieldObj;
        });

        const HasError = FormatedData.some(field => field === 'Error');
        return HasError ? 'Error' : FormatedData;
    }, []);

    return {
        Fields,
        FieldsIsActive: Fields.length,
        Dispatchers: {
            AddField,
            RemoveFields,
            FieldsFormater,
            FieldDispatchers,
        },
    };
};
export default useField;
