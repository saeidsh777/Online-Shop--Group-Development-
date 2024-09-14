'use client';
import { ProductContext } from '@/contexts/ProductProvider';
import React, { useContext } from 'react';

export default function Step() {
    const { step } = useContext(ProductContext);
    return (
        <div className="flex justify-center items-center mb-5">
            <div className="w-16 h-16 bg-blue-500 text-white text-3xl rounded-full flex justify-center items-center">
                1
            </div>
            <hr
                className={`w-10 sm:w-20 border-2 ${
                    step >= 2 ? 'border-blue-500' : 'border-gray-400'
                }`}
            />
            <div
                className={`w-16 h-16 text-white text-3xl rounded-full flex justify-center items-center ${
                    step >= 2
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-400 text-gray-200'
                }`}
            >
                2
            </div>
            <hr
                className={`w-10 sm:w-20 border-2 ${
                    step === 3 ? 'border-blue-500' : 'border-gray-400'
                }`}
            />
            <div
                className={`w-16 h-16 text-white text-3xl rounded-full flex justify-center items-center ${
                    step === 3
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-400 text-gray-200'
                }`}
            >
                3
            </div>
        </div>
    );
}
