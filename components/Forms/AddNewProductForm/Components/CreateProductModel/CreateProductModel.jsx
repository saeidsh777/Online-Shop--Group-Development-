import React from 'react';
import NewProductModel from '../NewProductModel/NewProductModel';
import { LuPlus } from 'react-icons/lu';

export default function CreateProductModel() {
    return (
        <>
            <button
                type="button"
                className="bg-gray-100 p-2 text-sm rounded-md flex items-center mb-5 hover:bg-gray-300 hover:shadow"
            >
                <LuPlus /> Create New Model
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
                <NewProductModel />
            </div>
        </>
    );
}
