'use client';
import { createContext, useState } from 'react';
import defaultImage from '../public/images/default-image-product.svg';

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
    const [fixedInputs, setFixedInputs] = useState({
        name: '',
        category: {},
        description: '',
        price: '',
        discountType: '-1',
        discount: '',
        finalPrice: 0,
    });

    const [categories, setCategories] = useState([]);

    const [step, setStep] = useState(1);

    const [productImages, setProductImages] = useState({
        image0: defaultImage,
        image1: defaultImage,
        image2: defaultImage,
        image3: defaultImage,
    });

    const [images, setImages] = useState([]);

    const onChangeFixedInputs = datas => {
        setFixedInputs(prv => {
            return {
                ...prv,
                ...datas,
            };
        });
    };

    const onChangeCategory = (e) => {
        const newCategory = categories.find(item => item.id === e.target.value);
        newCategory
            ? setFixedInputs(prv => {
                  return {
                      ...prv,
                      category: {
                          ...newCategory,
                      },
                  };
              })
            : setFixedInputs(prv => {
                  return {
                      ...prv,
                      category: {
                          _id: '-1',
                      },
                  };
              });
    };

    const formDataGenarator = () => {
        const formData = new FormData();
        formData.append('title', inputs.name);
        formData.append('description', inputs.description);
        formData.append('price', +inputs.price);
        formData.append('category', inputs.category);
        inputs.discount && formData.append('discount', +inputs.discount);
        if (images.length > 0) {
            console.log(images);
            for (let i = 0; i < images.length; i++) {
                formData.append(`images`, images[i]);
            }
        }
        return formData;
    };

    const contextValues = {
        fixedInputs,
        onChangeFixedInputs,
        categories,
        setCategories,
        productImages,
        setProductImages,
        images,
        setImages,
        step,
        setStep,
        onChangeCategory,
        formDataGenarator,
    };

    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    );
}
