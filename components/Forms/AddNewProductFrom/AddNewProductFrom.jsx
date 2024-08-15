'use client';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';

import SubmitBtn from '@/components/Buttons/SubmitBtn/SubmitBtn';
import { NewProductContext } from '@/contexts/NewProductProvider';
import { FiUploadCloud } from 'react-icons/fi';
import { justNumberRegex } from '@/utils/regex';

export default function AddNewProductFrom() {
    const { inputs, onChange } = useContext(NewProductContext);
    const [dataInputFile, setDataInputFile] = useState({});
    const productImage = useRef();

    // Receiving photos from input file and creating a viewable photo
    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                productImage.current.setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Product discount calculation
    const discountHandler = value => {
        // For numeric discountType
        if (inputs.discountType === 'Numerical') {
            if (inputs.price - value >= 0) {
                onChange('finalPrice', inputs.price - value);
            } else {
                onChange('finalPrice', inputs.price - inputs.price);
            }
        }

        // For numeric Percentage
        if (inputs.discountType === 'Percentage') {
            if (value >= 100) {
                onChange('finalPrice', 0);
            } else if (value <= 0) {
                onChange('finalPrice', +inputs.price);
            } else {
                onChange(
                    'finalPrice',
                    +inputs.price - (+inputs.price * +value) / 100
                );
            }
        }
    };

    const submitHandler = () => {};

    return (
        <form
            className=" grid grid-cols-1 lg:grid-cols-2 gap-3"
            name="add-new-product"
            onSubmit={submitHandler}
        >
            <div className="p-4 border border-gray-200 rounded-xl">
                <div className="mb-3">
                    <label className="text-sm" htmlFor="name">
                        Product Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter product name"
                            className="General_Input_1"
                            value={inputs?.name}
                            onChange={e => onChange('name', +e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="text-sm" htmlFor="category">
                        Category
                    </label>
                    <div className="mt-2">
                        <select
                            id="category"
                            className="General_Input_1 h-[36px]"
                            value={inputs?.category}
                            onChange={e => onChange('category', +e.target.value)}
                        >
                            <option value="-1">Select your category</option>
                            <option value="1">Mobil</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="text-sm" htmlFor="price">
                        Price
                    </label>
                    <div className="mt-2 relative Input_Label_Dollar">
                        <input
                            id="price"
                            type="text"
                            placeholder="0 $"
                            className="General_Input_1"
                            value={inputs?.price}
                            onChange={e => {
                                if (justNumberRegex.test(e.target.value)) {
                                    onChange('price', +e.target.value);
                                    onChange('discount', "");
                                    onChange('finalPrice', +e.target.value);
                                } else {
                                    if (e.target.value.length == 0) {
                                        onChange('price', '');
                                        onChange('discount', "");
                                        onChange('finalPrice', 0);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="mb-3 w-full md:w-[30%]">
                        <label className="text-sm" htmlFor="discountType">
                            Discount Type
                        </label>
                        <div className="mt-2">
                            <select
                                id="discountType"
                                className="General_Input_1 h-[36px]"
                                value={inputs?.discountType}
                                onChange={e => {
                                    onChange('discountType', e.target.value);
                                    onChange('discount', "");
                                    onChange('finalPrice', +inputs.price);
                                }}
                            >
                                <option value="-1">Select type</option>
                                <option value="Numerical">$</option>
                                <option value="Percentage">%</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="text-sm" htmlFor="discount">
                            Discount
                        </label>
                        <div className="mt-2">
                            <input
                                id="discount"
                                type="text"
                                placeholder="..."
                                className="General_Input_1"
                                value={inputs?.discount}
                                onChange={e => {
                                    if (justNumberRegex.test(e.target.value)) {
                                        onChange('discount', +e.target.value);
                                        discountHandler(e.target.value);
                                    } else {
                                        if (e.target.value.length == 0) {
                                            onChange('discount', '');
                                            onChange(
                                                'finalPrice',
                                                +inputs.price
                                            );
                                        }
                                    }
                                }}
                                disabled={
                                    inputs?.discountType == '-1' ? true : false
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <small className="flex items-center text-sm text-gray-400">
                        Total Price:
                        <span className="ms-4">
                            {inputs.price ? inputs.price.toLocaleString() : 0} $
                        </span>
                    </small>
                </div>
                <div>
                    <small className="flex items-center text-sm text-gray-400">
                        Discount Price:
                        <span className="ms-4">
                            {inputs.discount
                                ? inputs.discount < inputs.price
                                    ? inputs.discount.toLocaleString()
                                    : inputs.price
                                : 0}{' '}
                            $
                        </span>
                    </small>
                </div>
                <div className="mt-3">
                    <small>
                        Final Price:
                        <span className="ms-2 bg-gray-100 px-2 py-1 rounded-lg">
                            {inputs.finalPrice.toLocaleString()} $
                        </span>
                    </small>
                </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-xl">
                <div className="mb-3">
                    <label
                        htmlFor="img"
                        className={`${
                            dataInputFile.name
                                ? 'bg-gradient-to-r from-sky-50 to-indigo-100'
                                : 'bg-inherit'
                        } flex justify-between overflow-hidden hover:bg-gray-50 cursor-pointer items-center border border-gray-200 rounded-md`}
                    >
                        <Image
                            ref={productImage}
                            src="/images/default-image-product.svg"
                            width={100}
                            height={100}
                            alt="product image"
                            className={`${
                                dataInputFile.name
                                    ? 'ps-0 object-cover w-[100px] h-[100px]'
                                    : 'ps-2'
                            } `}
                        />
                        <div className="w-full flex flex-col items-center justify-center">
                            <FiUploadCloud className="iconFontSize" />
                            <p>
                                {dataInputFile.name
                                    ? dataInputFile.name
                                    : 'No File'}
                            </p>
                        </div>
                        <input
                            id="img"
                            type="file"
                            className="hidden"
                            name="files"
                            onChange={e => {
                                readURL(e.target);
                                setDataInputFile(e.target.files[0]);
                            }}
                            accept="image/png, image/jpeg, image/jpg"
                        />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="text-sm" htmlFor="description">
                        Product Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            rows={8}
                            id="description"
                            type="text"
                            value={inputs?.description}
                            onChange={e =>
                                onChange('description', e.target.value)
                            }
                            placeholder="Enter product description ..."
                            className="General_Input_1"
                        ></textarea>
                    </div>
                </div>
                <SubmitBtn title="Create Product" />
            </div>
        </form>
    );
}
