'use client';
import { createContext, useEffect, useState } from 'react';
import defaultImage from '../public/images/default-image-product.svg';

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
    const [fixedInputs, setFixedInputs] = useState({
        name: '',
        category: { _id: '-1' },
        description: '',
        detailFields: [],
        isValid: false,
    });

    const [categories, setCategories] = useState([]);

    const [step, setStep] = useState(1);

    const [completed, setCompleted] = useState(false);

    const [models, setModels] = useState([]);

    const [ready, setReady] = useState(false);

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

    const reset = () => {
        setFixedInputs({
            name: '',
            category: { _id: '-1' },
            description: '',
            detailFields: [],
            isValid: false,
        });
        setCategories([]);
        setStep(1);
        setCompleted(false);
        setModels([]);
        setReady(false);
        setProductImages({
            image0: defaultImage,
            image1: defaultImage,
            image2: defaultImage,
            image3: defaultImage,
        });
        setImages([]);
    };

    useEffect(() => {
        let isValid = true;
        models.forEach(model => {
            isValid =
                isValid &&
                model.isValidModelFields.categoryFields &&
                model.isValidModelFields.fixedFields;
        });
        isValid ? setReady(true) : setReady(false);
    }, [models]);

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
        const formData = new FormData();
        formData.append('title', fixedInputs.name);
        formData.append('description', fixedInputs.description);
        formData.append('category', fixedInputs.category._id);
        if (fixedInputs.detailFields.length > 0) {
            fixedInputs.detailFields.forEach((item, index) => {
                formData.append(`details[${index}][name]`, item.name);
                formData.append(`details[${index}][value]`, item.value);
                formData.append(
                    `details[${index}][description]`,
                    item.description
                );
            });
        }
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append(`images`, images[i]);
            }
        }
        console.log(formData);

        return formData;
    };

    const contextValues = {
        fixedInputs,
        setFixedInputs,
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
        completed,
        setCompleted,
        ready,
        reset,
        onChangeCategory,
        formDataGenarator,
    };

    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    );
}
