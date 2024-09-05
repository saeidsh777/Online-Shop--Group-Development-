import React, { useContext } from 'react';
import NewProductModel from '../NewProductModel/NewProductModel';
import { LuPlus } from 'react-icons/lu';
import { ProductContext } from '@/contexts/ProductProvider';

export default function CreateProductModel() {
    const { models, setModels } = useContext(ProductContext);
    return (
        <>
            <button
                type="button"
                className="bg-gray-100 p-2 text-sm rounded-md flex items-center mb-10 hover:bg-gray-300 hover:shadow"
                onClick={() =>
                    setModels(prv => [
                        ...prv,
                        { ...prv[0], _id: crypto.randomUUID() },
                    ])
                }
            >
                <LuPlus /> Create New Model
            </button>
            <div
                className={`grid grid-cols-1 gap-3 mb-5 ${
                    models.length <= 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'
                }`}
            >
                {models.map((model, index) => (
                    <NewProductModel
                        key={model._id}
                        {...model}
                        indexModel={index}
                    />
                ))}
            </div>
        </>
    );
}
