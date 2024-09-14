'use client';
import { createContext, useEffect, useState } from 'react';
import defaultImage from '../public/images/default-image-product.svg';
import { addNewProduct, addNewProductModel } from '@/services/product';
import toast from 'react-hot-toast';

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

    useEffect(() => {
        const category = fixedInputs.category;
        if (category._id !== '-1') {
            let productVariantsSchema = [...category.productVariantsSchema].map(
                productVariant => {
                    return {
                        ...productVariant,
                        value:
                            productVariant.variantName.toLowerCase() === 'color'
                                ? '#000000'
                                : '',
                        isValid:
                            productVariant.variantName.toLowerCase() === 'color'
                                ? true
                                : false,
                    };
                }
            );

            setModelsForCategory(productVariantsSchema);
        } else {
            setModelsForCategory([]);
        }
    }, [fixedInputs.category]);

    const setModelsForCategory = productVariantsSchema => {
        setModels([
            {
                _id: crypto.randomUUID(),
                categoryFields: productVariantsSchema,
                detialFields: [],
                fixedFields: {
                    price: '',
                    count: '',
                    discountType: '-1',
                    discount: '',
                    finalPrice: 0,
                },
                isValidModelFields: {
                    categoryFields: false,
                    fixedFields: false,
                },
            },
        ]);
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

        return formData;
    };

    const submitHandler = async e => {
        e.preventDefault();
        const { res, result } = await addNewProduct(formDataGenarator);
        if (res.status === 201) {
            let formatDataModel = {
                productModels: [],
                product: result._id,
                category: fixedInputs.category._id,
            };

            models.map(async model => {
                const AdditionalFields = {};
                !!model.categoryFields.length &&
                    model.categoryFields.map(field => {
                        AdditionalFields[field.variantName] = field.value;
                    });
                !!model.detialFields.length &&
                    model.detialFields.map(field => {
                        AdditionalFields[field.name] = field.value;
                    });
                let productModel = {
                    price: Number(model.fixedFields.price),
                    count: Number(model.fixedFields.count),
                    discount:
                        model.fixedFields.discountType === 'Percentage'
                            ? (Number(model.fixedFields.price) *
                                  Number(model.fixedFields.discount)) /
                              100
                            : Number(model.fixedFields.discount),
                    additionalFields: AdditionalFields,
                };

                formatDataModel.productModels.push(productModel);
            });

            const {
                res: resModel,
                result: resultModel,
                err: errModel,
            } = await addNewProductModel(formatDataModel);

            if (resModel.status === 201) {
                setCompleted(true);
                toast.success('Product created successfully');
            } else {
                toast.error(resultModel.message);
            }
        } else {
            toast.error(result.message);
        }
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
        setModelsForCategory,
        onChangeCategory,
        formDataGenarator,
        submitHandler,
    };

    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    );
}
