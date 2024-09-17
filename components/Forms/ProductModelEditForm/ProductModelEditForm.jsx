'use client';
import React, { useEffect, useState } from 'react';
import SelectInput from './Components/SelectInput/SelectInput';
import ColorInput from './Components/ColorInput/ColorInput';
import CategoryInputs from './Components/CategoryInputs/CategoryInputs';
import { justNumberRegex } from '@/utils/regex';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import { editProductModel } from '@/services/product';
import toast from 'react-hot-toast';

export default function ProductModelEditForm({
    price,
    count,
    discount,
    additionalFields,
    categoryFields,
    productModelId,
    productId,
    categoryId,
}) {
    const [data, setData] = useState({
        price,
        count,
        discount: discount === 0 ? '' : discount,
        discountType: discount === 0 ? '-1' : 'Numerical',
        finalPrice: price - discount,
        fields: [],
    });
    const [editMode, setEditMode] = useState(false);

    const categoryGenerator = () => {
        let newFieldsArray = [];
        categoryFields.forEach(field => {
            for (let item in additionalFields) {
                if (field.variantName === item) {
                    let newFields = {};
                    newFields._id = field._id;
                    newFields.name = field.variantName;
                    newFields.value = additionalFields[item];
                    newFields.variantOptions = field.variantOptions;
                    newFieldsArray.push(newFields);
                }
            }
        });
        return newFieldsArray;
    };

    useEffect(() => {
        setData(prv => {
            return {
                ...prv,
                fields: categoryGenerator(),
            };
        });
    }, []);

    const discountHandler = (from, value) => {
        if (from === 'price') {
            // For numeric discountType
            if (data.discountType === 'Numerical') {
                if (+value - +data.discount <= 0) {
                    return 0;
                } else {
                    return +value - +data.discount;
                }
            }

            // For numeric Percentage
            if (data.discountType === 'Percentage') {
                if (data.discount >= 100) {
                    return 0;
                } else if (data.discount <= 0) {
                    return +value;
                } else {
                    return +value - (+data.discount * +value) / 100;
                }
            }
            if (data.discountType === '-1') {
                return +value;
            }
        }

        if (from === 'discount') {
            // For numeric discountType
            if (data.discountType === 'Numerical') {
                if (+data.price - +value <= 0) {
                    return 0;
                } else {
                    return +data.price - +value;
                }
            }

            // For numeric Percentage
            if (data.discountType === 'Percentage') {
                if (value >= 100) {
                    return 0;
                } else if (value <= 0) {
                    return +data.price;
                } else {
                    return +data.price - (+data.price * +value) / 100;
                }
            }

            if (data.discountType === '-1') {
                return data.price;
            }
        }

        if (from === 'discountType') {
            if (value === '-1') {
                return +data.price;
            }

            // For numeric discountType
            if (value === 'Numerical') {
                if (+data.price - +data.discount <= 0) {
                    return 0;
                } else {
                    return +data.price - +data.discount;
                }
            }

            // For numeric Percentage
            if (value === 'Percentage') {
                if (+data.discount >= 100) {
                    return 0;
                } else if (+data.discount <= 0) {
                    return +data.price;
                } else {
                    return +data.price - (+data.price * +data.discount) / 100;
                }
            }
        }
    };

    const onChangePrice = e => {
        if (justNumberRegex.test(+e.target.value)) {
            setData(prv => {
                return {
                    ...prv,
                    price: e.target.value.length == 0 ? '' : e.target.value,
                    finalPrice:
                        e.target.value.length == 0
                            ? 0
                            : discountHandler('price', e.target.value),
                };
            });
        }
    };

    const onChangeCount = e => {
        if (justNumberRegex.test(+e.target.value)) {
            setData(prv => {
                return {
                    ...prv,
                    count: e.target.value,
                };
            });
        }
    };

    const onChangeDiscountType = e => {
        setData(prv => {
            return {
                ...prv,
                discountType: e.target.value,
                discount:
                    e.target.value === '-1'
                        ? ''
                        : e.target.value === 'Numerical'
                        ? +data.discount > +data.price
                            ? data.price
                            : data.discount
                        : e.target.value === 'Percentage'
                        ? +data.discount > 100
                            ? 100
                            : data.discount
                        : e.target.value === '-1' && '',
                finalPrice: discountHandler('discountType', e.target.value),
            };
        });
    };

    const onChangeDiscount = e => {
        if (justNumberRegex.test(+e.target.value)) {
            setData(prv => {
                return {
                    ...prv,
                    discount:
                        e.target.value.length == 0
                            ? ''
                            : data.discountType === 'Numerical'
                            ? +e.target.value > +data.price
                                ? data.price
                                : e.target.value
                            : data.discountType === 'Percentage' &&
                              +e.target.value > 100
                            ? 100
                            : +e.target.value < 0
                            ? 0
                            : e.target.value,
                    finalPrice:
                        e.target.value.length == 0
                            ? data.price
                            : discountHandler('discount', e.target.value),
                };
            });
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        let formatDataModel = {
            productModels: [],
            product: productId,
            category: categoryId,
        };

        const AdditionalFields = {};
        !!data.fields.length &&
            data.fields.map(field => {
                AdditionalFields[field.name] = field.value;
            });
        let productModel = {
            price: Number(data.price),
            count: Number(data.count),
            discount:
                data.discountType === 'Percentage'
                    ? (Number(data.price) * Number(data.discount)) / 100
                    : Number(data.discount),
            additionalFields: AdditionalFields,
        };

        formatDataModel.productModels.push(productModel);

        const { res, result, err } = await editProductModel(
            formatDataModel,
            productModelId
        );
        console.log(formatDataModel);
        console.log(result);

        if (res.status === 201) {
            setEditMode(false);
            toast.success('Product Model Update Successfully');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="p-3 border border-gray-200 rounded-xl pt-6 mb-5 flex flex-col justify-between md:col-span-2">
            <form onSubmit={onSubmit}>
                {!!data.fields.length && (
                    <div className="bg-gray-100 rounded-md p-2 mb-2">
                        <span className="text-sm block">
                            <sup className="text-red-500">*</sup>Category
                            Fields:
                        </span>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
                            {data.fields.map(field => {
                                if (field.variantOptions.length) {
                                    return (
                                        <SelectInput
                                            key={field._id}
                                            {...field}
                                            setData={setData}
                                            editMode={!editMode}
                                        />
                                    );
                                } else if (
                                    field.name.toLowerCase() === 'color'
                                ) {
                                    return (
                                        <ColorInput
                                            key={field._id}
                                            {...field}
                                            setData={setData}
                                            editMode={!editMode}
                                        />
                                    );
                                } else {
                                    return (
                                        <CategoryInputs
                                            key={field._id}
                                            {...field}
                                            setData={setData}
                                            editMode={!editMode}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>
                )}

                <div className="bg-gray-100 rounded-md p-2 mb-2">
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
                                    disabled={!editMode}
                                    className={`General_Input_1 ${
                                        !data.price &&
                                        'ring-red-400 focus-visible:ring-red-400'
                                    }`}
                                    value={data.price}
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
                                    disabled={!editMode}
                                    className={`General_Input_1 ${
                                        !data.count &&
                                        'ring-red-400 focus-visible:ring-red-400'
                                    }`}
                                    value={data.count}
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
                                    disabled={!editMode}
                                    value={data.discountType}
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
                                        data.discountType === '-1'
                                            ? true
                                            : false
                                    }
                                    value={data.discount}
                                    onChange={onChangeDiscount}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2"></div>
                </div>
                <div className={`${editMode ? "bg-green-100": "bg-gray-200"} p-2 rounded-md mb-2`}>
                    {/* Total Price */}
                    <div className="mt-3">
                        <small className="flex items-center text-sm text-gray-400">
                            Total Price:
                            <span className="ms-4">
                                {data.price
                                    ? Number(data.price).toLocaleString()
                                    : 0}{' '}
                                $
                            </span>
                        </small>
                    </div>
                    {/* Discount Price */}
                    <div>
                        <small className="flex items-center text-sm text-gray-400">
                            Discount Price:
                            <span className="ms-4 text-red-300">
                                {data.discount
                                    ? data.discountType === 'Numerical'
                                        ? Number(data.discount) <
                                          Number(data.price)
                                            ? Number(data.discount)
                                            : Number(
                                                  data.price
                                              ).toLocaleString()
                                        : data.discountType === 'Percentage' &&
                                          (Number(data.discount) *
                                              Number(data.price)) /
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
                                {Number(data.finalPrice).toLocaleString()} $
                            </span>
                        </small>
                    </div>
                </div>
                <div className="mb-2">
                    {editMode ? (
                        <div className="flex gap-2">
                            <DashboardBTN
                                className="bg-gray-400"
                                onClick={() => {
                                    setData({
                                        price,
                                        count,
                                        discount:
                                            discount === 0 ? '' : discount,
                                        discountType:
                                            discount === 0 ? '-1' : 'Numerical',
                                        finalPrice: price - discount,
                                        fields: categoryGenerator(),
                                    });
                                    setEditMode(false);
                                }}
                            >
                                Cancel
                            </DashboardBTN>
                            <DashboardBTN
                                type="submit"
                                onClick={() => setEditMode(true)}
                            >
                                Save
                            </DashboardBTN>
                        </div>
                    ) : (
                        <DashboardBTN onClick={() => setEditMode(true)}>
                            Edit
                        </DashboardBTN>
                    )}
                </div>
            </form>
        </div>
    );
}
