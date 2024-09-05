import { ProductContext } from '@/contexts/ProductProvider';
import React, { useContext } from 'react';

export default function ColorInput({ modelId, value, _id, variantName }) {
    const { setModels } = useContext(ProductContext);
    const newId = crypto.randomUUID();

    const onChange = e => {
        setModels(prv =>
            prv.map(model => {
                if (modelId !== model._id) return model;

                return {
                    ...model,
                    categoryFiels: model.categoryFiels.map(field => {
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
    return (
        <div className="flex items-center gap-2 mb-2">
            <label
                htmlFor={variantName + newId}
                className="text-sm"
            >
                Color:
            </label>
            <div>
                <input
                    id={variantName + newId}
                    type="color"
                    value={value}
                    onChange={onChange}
                    className="General_Input_1 w-20"
                />
            </div>
        </div>
    );
}
