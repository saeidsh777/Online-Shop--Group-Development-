import React from 'react';

export default function SelectInput({ variantName, variantOptions, _id }) {
    return (
        <div className="flex items-center gap-2 mb-2">
            <label htmlFor={variantName + _id} className="text-sm">
                Size:
            </label>
            <div>
                <select
                    name={variantName}
                    id={variantName + _id}
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
