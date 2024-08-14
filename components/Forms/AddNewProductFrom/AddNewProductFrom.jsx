'use client';
import SubmitBtn from '@/components/Buttons/SubmitBtn/SubmitBtn';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

export default function AddNewProductFrom() {
    const [textInputFile, setTextInputFile] = useState('No File');
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

    return (
        <form
            className=" grid grid-cols-1 lg:grid-cols-2 gap-3"
            name="add-new-product"
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
                            >
                                <option value="-1">Select type</option>
                                <option value="Numerical">$</option>
                                <option value="Percentage">%</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 w-full">
                        <label className="text-sm" htmlFor="price">
                            Discount
                        </label>
                        <div className="mt-2">
                            <input
                                id="price"
                                type="text"
                                placeholder="..."
                                className="General_Input_1"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <small>
                        Final Price:{' '}
                        <span className="ms-2 bg-gray-100 px-2 py-1 rounded-lg">
                            0$
                        </span>
                    </small>
                </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-xl">
                <div className="mb-3">
                    <label
                        htmlFor="img"
                        className={`${
                            textInputFile === 'No File'
                                ? 'bg-inherit'
                                : 'bg-gradient-to-r from-sky-50 to-indigo-100'
                        } flex justify-between overflow-hidden hover:bg-gray-50 cursor-pointer items-center border border-gray-200 rounded-md`}
                    >
                        <Image
                            ref={productImage}
                            src="/images/default-image-product.svg"
                            width={100}
                            height={100}
                            alt="product image"
                            className={`${
                                textInputFile == 'No File'
                                    ? 'ps-2'
                                    : 'ps-0 object-cover w-[100px] h-[100px]'
                            } `}
                        />
                        <div className="w-full flex flex-col items-center justify-center">
                            <FiUploadCloud className="iconFontSize" />
                            <p>{textInputFile}</p>
                        </div>
                        <input
                            id="img"
                            type="file"
                            className="hidden"
                            onChange={e => {
                                readURL(e.target);
                                setTextInputFile(e.target.files[0].name);
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
                            placeholder="Enter product description ..."
                            className="General_Input_1"
                        ></textarea>
                    </div>
                </div>
                <SubmitBtn title="Create Product"/>
            </div>
        </form>
    );
}
