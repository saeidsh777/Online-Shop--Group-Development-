import React from 'react';
import SelectInput from '../SelectInput/SelectInput';
import ColorInput from '../ColorInput/ColorInput';
import CategoryInputs from '../CategoryInputs/CategoryInputs';

export default function NewProductModel() {
    return (
        <div className="p-2 border border-gray-200 rounded-xl">
            <div className="bg-gray-100 rounded-sm p-2">
                <span className="text-sm block mb-5">
                    <sup className="text-red-500">*</sup>Category Fields:
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
                    <SelectInput />
                    <ColorInput />
                    <CategoryInputs />
                    <CategoryInputs />
                </div>
            </div>
        </div>
    );
}
