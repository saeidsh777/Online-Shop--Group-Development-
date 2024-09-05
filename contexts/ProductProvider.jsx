'use client';
import { createContext, useState } from 'react';
import defaultImage from '../public/images/default-image-product.svg';

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
    const [fixedInputs, setFixedInputs] = useState({
        name: '',
        category: { _id: '-1' },
        description: '',
    });

    const [categories, setCategories] = useState([]);

    const [step, setStep] = useState(1);

    const [models, setModels] = useState([]);

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

    const onChangeCategory = e => {
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
        let newModels = [...models].map(model => {
            return {
                ...model,
                fixedFields: {
                    discount: Number(model.fixedFields.discount),
                    price: Number(model.fixedFields.price),
                    count: Number(model.fixedFields.count),
                },
            };
        });

        console.log(newModels);

        const formData = new FormData();
        formData.append('title', fixedInputs.name);
        formData.append('description', fixedInputs.description);
        formData.append('category', fixedInputs.category._id);
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append(`images`, images[i]);
            }
        }

        formData.append('productModels', JSON.stringify(newModels));
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
        models,
        setModels,
        onChangeCategory,
        formDataGenarator,
    };

    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    );
}
