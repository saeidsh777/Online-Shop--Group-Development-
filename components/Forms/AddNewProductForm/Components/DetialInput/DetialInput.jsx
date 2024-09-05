import { ProductContext } from '@/contexts/ProductProvider';
import React, { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

export default function DetialInput({ modelId, name, value, _id }) {
    const { setModels } = useContext(ProductContext);

    const nameId = crypto.randomUUID();
    const valueId = crypto.randomUUID();

    const onChangeName = e => {
        setModels(prv =>
            prv.map(model => {
                if (model._id !== modelId) {
                    return model;
                }
                return {
                    ...model,
                    detialFields: model.detialFields.map(field => {
                        if (field._id !== _id) return field;
                        return {
                            ...field,
                            name: e.target.value,
                        };
                    }),
                };
            })
        );
    };

    const onChangeValue = e => {
        setModels(prv =>
            prv.map(model => {
                if (model._id !== modelId) return model;
                return {
                    ...model,
                    detialFields: model.detialFields.map(field => {
                        if (field._id !== _id) return field;
                        return {
                            ...field,
                            value: e.target.value,
                        };
                    }),
                };
            })
        );
    };

    const deleteField = (fieldID) => {
        setModels(prv =>
            prv.map(model => {
                if (model._id !== modelId) return model;
                return {
                    ...model,
                    detialFields: model.detialFields.filter(
                        field => field._id !== fieldID
                    ),
                };
            })
        );
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
                <label htmlFor={nameId} className="text-sm">
                    Name:
                </label>
                <div>
                    <input
                        id={nameId}
                        value={name}
                        onChange={onChangeName}
                        type="text"
                        className="General_Input_1"
                    />
                </div>
            </div>
            <div>
                <label htmlFor={valueId} className="text-sm">
                    Value:
                </label>
                <div className="flex items-center gap-1">
                    <input
                        id={valueId}
                        value={value}
                        onChange={onChangeValue}
                        type="text"
                        className="General_Input_1"
                    />
                    <AiOutlineDelete
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => deleteField(_id)}
                    />
                </div>
            </div>
        </div>
    );
}
