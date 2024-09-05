import { ProductContext } from '@/contexts/ProductProvider';
import React, { useContext } from 'react';

export default function SelectInput({
    variantName,
    variantOptions,
    _id,
    value,
    modelId,
}) {
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
            <label htmlFor={variantName + newId} className="text-sm">
                Size:
            </label>
            <div>
                <select
                    name={variantName}
                    id={variantName + newId}
                    value={value}
                    onChange={onChange}
                    className="General_Input_1"
                >
                    <option value="-1">Select Size</option>
                    {variantOptions.map(option => (
                        <option value={option} key={crypto.randomUUID()}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}