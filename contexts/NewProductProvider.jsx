'use client';
import { createContext, useState } from 'react';

export const NewProductContext = createContext({});

export default function NewProductProvider({ children }) {
    const [inputs, setInputs] = useState({
        name: '',
        category: '',
        categories: [],
        price: "",
        discountType: '-1',
        description:"",
        discount: "",
        finalPrice: 0,
    });

    const onChange = (fieldName, value) => {
        setInputs(prv => {
            return {
                ...prv,
                [fieldName]: value,
            };
        });
    };

    const contextValue = {
        inputs,
        onChange,
        setInputs,
    };

    return (
        <NewProductContext.Provider value={contextValue}>
            {children}
        </NewProductContext.Provider>
    );
}
