import React, { useContext, useEffect } from 'react';
import SelectInput from '../SelectInput/SelectInput';
import ColorInput from '../ColorInput/ColorInput';
import CategoryInputs from '../CategoryInputs/CategoryInputs';
import { IoIosClose } from 'react-icons/io';
import { ProductContext } from '@/contexts/ProductProvider';
import toast from 'react-hot-toast';
import { justNumberRegex } from '@/utils/regex';

export default function NewProductModel({
    _id,
    categoryFields,
    indexModel,
    fixedFields,
}) {
    const { models, setModels } = useContext(ProductContext);

    useEffect(() => {
        let isValidFields = true;
        categoryFields.forEach(field => {
            if (field?.optional) {
                null
            } else {
                isValidFields = isValidFields && field.isValid;
            }
        });
        if (isValidFields) {
            setModels(prv =>
                prv.map(model => {
                    if (model._id !== _id) return model;

                    return {
                        ...model,
                        isValidModelFields: {
                            ...model.isValidModelFields,
                            categoryFields: true,
                        },
                    };
                })
            );
        } else {
            setModels(prv =>
                prv.map(model => {
                    if (model._id !== _id) return model;

                    return {
                        ...model,
                        isValidModelFields: {
                            ...model.isValidModelFields,
                            categoryFields: false,
                        },
                    };
                })
            );
        }
    }, [categoryFields]);

    useEffect(() => {
        let isValidFields = false;
        if (fixedFields.price && fixedFields.count) {
            isValidFields = true;
        } else {
            isValidFields = false;
        }
        if (isValidFields) {
            setModels(prv =>
                prv.map(model => {
                    if (model._id !== _id) return model;

                    return {
                        ...model,
                        isValidModelFields: {
                            ...model.isValidModelFields,
                            fixedFields: true,
                        },
                    };
                })
            );
        } else {
            setModels(prv =>
                prv.map(model => {
                    if (model._id !== _id) return model;

                    return {
                        ...model,
                        isValidModelFields: {
                            ...model.isValidModelFields,
                            fixedFields: false,
                        },
                    };
                })
            );
        }
    }, [fixedFields]);

    // Product discount calculation
    const discountHandler = (from, value) => {
        if (from === 'price') {
            // For numeric discountType
            if (fixedFields.discountType === 'Numerical') {
                if (+value - +fixedFields.discount <= 0) {
                    return 0;
                } else {
                    return +value - +fixedFields.discount;
                }
            }

            // For numeric Percentage
            if (fixedFields.discountType === 'Percentage') {
                if (fixedFields.discount >= 100) {
                    return 0;
                } else if (fixedFields.discount <= 0) {
                    return +value;
                } else {
                    return +value - (+fixedFields.discount * +value) / 100;
                }
            }
            if (fixedFields.discountType === '-1') {
                return +value;
            }
        }

        if (from === 'discount') {
            // For numeric discountType
            if (fixedFields.discountType === 'Numerical') {
                if (+fixedFields.price - +value <= 0) {
                    return 0;
                } else {
                    return +fixedFields.price - +value;
                }
            }

            // For numeric Percentage
            if (fixedFields.discountType === 'Percentage') {
                if (value >= 100) {
                    return 0;
                } else if (value <= 0) {
                    return +fixedFields.price;
                } else {
                    return (
                        +fixedFields.price - (+fixedFields.price * +value) / 100
                    );
                }
            }

            if (fixedFields.discountType === '-1') {
                return fixedFields.price;
            }
        }

        if (from === 'discountType') {
            if (value === '-1') {
                return +fixedFields.price;
            }

            // For numeric discountType
            if (value === 'Numerical') {
                if (+fixedFields.price - +fixedFields.discount <= 0) {
                    return 0;
                } else {
                    return +fixedFields.price - +fixedFields.discount;
                }
            }

            // For numeric Percentage
            if (value === 'Percentage') {
                if (+fixedFields.discount >= 100) {
                    return 0;
                } else if (+fixedFields.discount <= 0) {
                    return +fixedFields.price;
                } else {
                    return (
                        +fixedFields.price -
                        (+fixedFields.price * +fixedFields.discount) / 100
                    );
                }
            }
        }
    };

    const onChangePrice = e => {
        if (justNumberRegex.test(+e.target.value)) {
            setModels(prv =>
                prv.map(model => {
                    if (model._id !== _id) return model;
                    return {
                        ...model,
                        fixedFields: {
                            ...model.fixedFields,
                            price:
                                e.target.value.length == 0
                                    ? ''
                                    : e.target.value,
                            finalPrice:
                                e.target.value.length == 0
                                    ? 0
                                    : discountHandler('price', e.target.value),
                        },
                    };
                })
            );
        }
    };

    const onChangeDiscountType = e => {
        setModels(prv =>
            prv.map(model => {
                if (model._id !== _id) return model;
                return {
                    ...model,
                    fixedFields: {
                        ...model.fixedFields,
                        discountType: e.target.value,
                        discount:
                            e.target.value === '-1'
                                ? ''
                                : e.target.value === 'Numerical'
                                ? +fixedFields.discount > +fixedFields.price
                                    ? fixedFields.price
                                    : fixedFields.discount
                                : e.target.value === 'Percentage'
                                ? +fixedFields.discount > 100
                                    ? 100
                                    : fixedFields.discount
                                : e.target.value === '-1' && '',
                        finalPrice: discountHandler(
                            'discountType',
                            e.target.value
                        ),
                    },
                };
            })
        );
    };

    const onChangeDiscount = e => {
        if (justNumberRegex.test(+e.target.value)) {
            setModels(prv =>
                prv.map(model => {
                    if (model._id !== _id) return model;
                    return {
                        ...model,
                        fixedFields: {
                            ...model.fixedFields,
                            discount:
                                e.target.value.length == 0
                                    ? ''
                                    : fixedFields.discountType === 'Numerical'
                                    ? +e.target.value > +fixedFields.price
                                        ? fixedFields.price
                                        : e.target.value
                                    : fixedFields.discountType ===
                                          'Percentage' && +e.target.value > 100
                                    ? 100
                                    : +e.target.value < 0
                                    ? 0
                                    : e.target.value,
                            finalPrice:
                                e.target.value.length == 0
                                    ? fixedFields.price
                                    : discountHandler(
                                          'discount',
                                          e.target.value
                                      ),
                        },
                    };
                })
            );
        }
    };

    const onChangeCount = e => {
        if (justNumberRegex.test(+e.target.value)) {
            setModels(prv =>
                prv.map(model => {
                    if (model._id !== _id) return model;
                    return {
                        ...model,
                        fixedFields: {
                            ...model.fixedFields,
                            count: e.target.value,
                        },
                    };
                })
            );
        }
    };

    return (
        <div className="p-3 border border-gray-200 rounded-xl pt-6 relative mb-5 flex flex-col justify-between">
            <span className="bg-blue-200 text-sm p-2 rounded-sm absolute top-[-1.5rem] left-3">
                Model {indexModel + 1}{' '}
            </span>
            <div>
                {models.length > 1 && (
                    <span
                        className="bg-red-200 flex justify-center items-center text-red-600 w-8 h-8 rounded-full absolute top-[-1rem] right-3"
                        onClick={() => {
                            setModels(prv =>
                                prv.filter(model => model._id !== _id)
                            );
                            toast.success('Model Deleted');
                        }}
                    >
                        <IoIosClose className="cursor-pointer text-[2rem] hover:text-red-500" />
                    </span>
                )}

                {!!categoryFields.length && (
                    <div className="bg-gray-100 rounded-sm p-2 mb-2">
                        <span className="text-sm block">
                            <sup className="text-red-500">*</sup>Category
                            Fields:
                        </span>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
                            {categoryFields.map(field => {
                                if (!!field.variantOptions.length) {
                                    return (
                                        <SelectInput
                                            key={field._id}
                                            {...field}
                                            modelId={_id}
                                        />
                                    );
                                } else if (
                                    field.variantName.toLowerCase() === 'color'
                                ) {
                                    return (
                                        <ColorInput
                                            key={field._id}
                                            {...field}
                                            modelId={_id}
                                        />
                                    );
                                } else {
                                    return (
                                        <CategoryInputs
                                            key={field._id}
                                            {...field}
                                            modelId={_id}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>
                )}

                <div className="bg-gray-100 rounded-sm p-2 mb-2">
                    <div className="flex flex-col md:flex-row gap-2 flex-wrap">
                        <div className="mb-3 flex-1">
                            <label className="text-sm" htmlFor="price">
                                Price
                            </label>
                            <div className="mt-2 relative Input_Label_Dollar">
                                <input
                                    id="price"
                                    inputMode="numeric"
                                    type="text"
                                    placeholder="0 $"
                                    className={`General_Input_1 ${
                                        !fixedFields.price &&
                                        'ring-red-400 focus-visible:ring-red-400'
                                    }`}
                                    value={fixedFields.price}
                                    onChange={onChangePrice}
                                />
                            </div>
                        </div>
                        <div className="mb-3 flex-1">
                            <label className="text-sm" htmlFor="Count">
                                Count
                            </label>
                            <div className="mt-2">
                                <input
                                    id="Count"
                                    inputMode="numeric"
                                    type="text"
                                    placeholder="Count"
                                    className={`General_Input_1 ${
                                        !fixedFields.count &&
                                        'ring-red-400 focus-visible:ring-red-400'
                                    }`}
                                    value={fixedFields.count}
                                    onChange={onChangeCount}
                                />
                            </div>
                        </div>
                        <div className="mb-3 flex-1">
                            <label className="text-sm" htmlFor="discountType">
                                Discount Type
                            </label>
                            <div className="mt-2">
                                <select
                                    id="discountType"
                                    className="General_Input_1 h-[36px]"
                                    value={fixedFields.discountType}
                                    onChange={onChangeDiscountType}
                                >
                                    <option value="-1">Select type</option>
                                    <option value="Numerical">$</option>
                                    <option value="Percentage">%</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 flex-1">
                            <label className="text-sm" htmlFor="discount">
                                Discount
                            </label>
                            <div className="mt-2">
                                <input
                                    id="discount"
                                    inputMode="numeric"
                                    type="text"
                                    placeholder="..."
                                    className="General_Input_1"
                                    disabled={
                                        fixedFields.discountType === '-1'
                                            ? true
                                            : false
                                    }
                                    value={fixedFields.discount}
                                    onChange={onChangeDiscount}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2"></div>
                </div>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
                <div className="mt-3">
                    <small className="flex items-center text-sm text-gray-400">
                        Total Price:
                        <span className="ms-4">
                            {fixedFields.price
                                ? Number(fixedFields.price).toLocaleString()
                                : 0}{' '}
                            $
                        </span>
                    </small>
                </div>
                <div>
                    <small className="flex items-center text-sm text-gray-400">
                        Discount Price:
                        <span className="ms-4 text-red-300">
                            {fixedFields.discount
                                ? fixedFields.discountType === 'Numerical'
                                    ? Number(fixedFields.discount) <
                                      Number(fixedFields.price)
                                        ? Number(fixedFields.discount)
                                        : Number(
                                              fixedFields.price
                                          ).toLocaleString()
                                    : fixedFields.discountType ===
                                          'Percentage' &&
                                      (Number(fixedFields.discount) *
                                          Number(fixedFields.price)) /
                                          100
                                : 0}
                            {' $'}
                        </span>
                    </small>
                </div>

                <div className="mt-3">
                    <small>
                        Final Price:
                        <span className="ms-2 bg-white px-2 py-1 rounded-lg">
                            {Number(fixedFields.finalPrice).toLocaleString()} $
                        </span>
                    </small>
                </div>
            </div>
        </div>
    );
}
