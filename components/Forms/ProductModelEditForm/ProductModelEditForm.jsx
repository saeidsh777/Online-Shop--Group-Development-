'use client';
import React, { useEffect, useState } from 'react';
import SelectInput from './Components/SelectInput/SelectInput';
import ColorInput from './Components/ColorInput/ColorInput';
import CategoryInputs from './Components/CategoryInputs/CategoryInputs';

export default function ProductModelEditForm({
    price,
    count,
    discount,
    additionalFields,
    categoryFields,
}) {
    const [data, setData] = useState({
        price,
        count,
        discount,
        fields: [],
    });

    useEffect(() => {
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
        setData(prv => {
            return {
                ...prv,
                fields: newFieldsArray,
            };
        });
    }, []);

    return (
        <div className="p-3 border border-gray-200 rounded-xl pt-6 relative mb-5 flex flex-col justify-between">
            <div>
                {!!data.fields.length && (
                    <div className="bg-gray-100 rounded-sm p-2 mb-2">
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
                                        />
                                    );
                                } else {
                                    return (
                                        <CategoryInputs
                                            key={field._id}
                                            {...field}
                                            setData={setData}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>
                )}

                {/* <div className="bg-gray-100 rounded-sm p-2 mb-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm block">Detial Fields:</span>
                        {!!detialFields.length && (
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-500 px-2 py-1 text-sm rounded-sm hover:shadow"
                                onClick={() => {
                                    setModels(prv =>
                                        prv.map(model => {
                                            if (model._id !== _id) return model;
                                            let detialField = {
                                                _id: crypto.randomUUID(),
                                                name: '',
                                                value: '',
                                            };
                                            return {
                                                ...model,
                                                detialFields: [
                                                    ...model.detialFields,
                                                    detialField,
                                                ],
                                            };
                                        })
                                    );
                                    toast.success('New Field Added');
                                }}
                            >
                                Add Field
                            </button>
                        )}
                    </div>

                    {!!detialFields.length ? (
                        detialFields.map(field => (
                            <div className="mt-3" key={field._id}>
                                <DetialInput {...field} modelId={_id} />
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center my-2">
                            <button
                                type="button"
                                className="bg-gray-200 w-full text-gray-500 py-2 text-sm rounded-sm hover:shadow"
                                onClick={() => {
                                    setModels(prv =>
                                        prv.map(model => {
                                            if (model._id !== _id) return model;
                                            let detialField = {
                                                _id: crypto.randomUUID(),
                                                name: '',
                                                value: '',
                                            };
                                            return {
                                                ...model,
                                                detialFields: [
                                                    ...model.detialFields,
                                                    detialField,
                                                ],
                                            };
                                        })
                                    );
                                    toast.success('New Field Added');
                                }}
                            >
                                Add Field
                            </button>
                        </div>
                    )}
                </div> */}

                {/* <div className="bg-gray-100 rounded-sm p-2 mb-2">
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
                </div> */}
            </div>
            {/* <div className="bg-green-100 p-2 rounded-md">
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
                                  : fixedFields.discountType === 'Percentage' &&
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
          </div> */}
        </div>
    );
}
