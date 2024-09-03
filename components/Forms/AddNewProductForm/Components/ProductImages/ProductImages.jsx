import { ProductContext } from '@/contexts/ProductProvider';
import Image from 'next/image';
import React, { useContext, useEffect, useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiUploadCloud } from 'react-icons/fi';
import defaultImage from '../../../../../public/images/default-image-product.svg';

export default function ProductImages() {
    const { productImages, setProductImages, images, setImages } =
        useContext(ProductContext);
    const filesInput = useRef();
    const productImagesElm = useRef([]);

    useEffect(() => {
        readURL();
    }, [images]);

    // Receiving photos from input file and creating a viewable photo
    function readURL() {
        let cachedURL = [];
        const uplodedfiles = [...images];
        uplodedfiles.forEach(file => cachedURL.push(URL.createObjectURL(file)));

        for (let i = 0; i < 4; i++) {
            if (i < uplodedfiles.length) {
                setProductImages(prv => {
                    return {
                        ...prv,
                        ['image' + i]: cachedURL[i],
                    };
                });
            } else {
                setProductImages(prv => {
                    return {
                        ...prv,
                        ['image' + i]: defaultImage,
                    };
                });
            }
        }
    }

    const addImageHandler = files => {
        const indexEnd = 4 - images.length;

        indexEnd !== 0 &&
            [...files].splice(0, indexEnd).forEach(file => {
                if (images.length < 4) {
                    setImages(prv => {
                        return [...prv, file];
                    });
                }
            });
    };

    const deleteImageHandler = imageIndex => {
        const newImage = images.filter((item, index) => index !== imageIndex);
        setImages(newImage);
    };

    return (
        <div className="flex flex-col gap-2 mb-3">
            <div className="p-2 md:p-3 lg:p-3.5 bg-[#F3F5F7] w-full rounded-lg flex gap-1.5 md:gap-2 lg:gap-3   896:flex-1">
                <div
                    className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 relative ${
                        !images[0] && 'flex justify-center items-center'
                    }`}
                >
                    <Image
                        ref={el => (productImagesElm.current['0'] = el)}
                        src={productImages.image0}
                        width={400}
                        height={400}
                        alt="product image"
                        className={`object-cover rounded-lg ${
                            images[0] ? 'w-[100%] h-[100%]' : 'w-[80%] h-[70%]'
                        }`}
                    />
                    {images[0] && (
                        <span
                            className="absolute bottom-0 right-0 p-3 rounded-md bg-red-100 bg-opacity-80 text-red-500 cursor-pointer"
                            onClick={() => deleteImageHandler(0)}
                        >
                            <AiOutlineDelete />
                        </span>
                    )}
                </div>
                <div className="grid grid-rows-3 gap-2 md:gap-3 lg:gap-3.5 sm:grid-rows-1 896:grid-cols-1 896:grid-rows-3 flex-1">
                    <div
                        className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 relative ${
                            !images[1] && 'flex justify-center items-center'
                        }`}
                    >
                        <Image
                            ref={el => (productImagesElm.current['1'] = el)}
                            src={productImages.image1}
                            width={400}
                            height={400}
                            alt="product image"
                            className={`object-cover rounded-lg ${
                                images[1]
                                    ? 'w-[100%] h-[100%]'
                                    : 'w-[90%] h-[90%]'
                            }`}
                        />
                        {images[1] && (
                            <span
                                className="absolute bottom-0 right-0 p-3 rounded-md bg-red-100 bg-opacity-80 text-red-500 cursor-pointer"
                                onClick={() => deleteImageHandler(1)}
                            >
                                <AiOutlineDelete />
                            </span>
                        )}
                    </div>
                    <div
                        className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 relative ${
                            !images[2] && 'flex justify-center items-center'
                        }`}
                    >
                        <Image
                            ref={el => (productImagesElm.current['2'] = el)}
                            src={productImages.image2}
                            width={400}
                            height={400}
                            alt="product image"
                            className={`object-cover rounded-lg ${
                                images[2]
                                    ? 'w-[100%] h-[100%]'
                                    : 'w-[90%] h-[90%]'
                            }`}
                        />
                        {images[2] && (
                            <span
                                className="absolute bottom-0 right-0 p-3 rounded-md bg-red-100 bg-opacity-80 text-red-500 cursor-pointer"
                                onClick={() => deleteImageHandler(2)}
                            >
                                <AiOutlineDelete />
                            </span>
                        )}
                    </div>
                    <div
                        className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 relative ${
                            !images[3] && 'flex justify-center items-center'
                        }`}
                    >
                        <Image
                            ref={el => (productImagesElm.current['3'] = el)}
                            src={productImages.image3}
                            width={400}
                            height={400}
                            alt="product image"
                            className={`object-cover rounded-lg ${
                                images[3]
                                    ? 'w-[100%] h-[100%]'
                                    : 'w-[90%] h-[90%]'
                            }`}
                        />
                        {images[3] && (
                            <span
                                className="absolute bottom-0 right-0 p-3 rounded-md bg-red-100 bg-opacity-80 text-red-500 cursor-pointer"
                                onClick={() => deleteImageHandler(3)}
                            >
                                <AiOutlineDelete />
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label
                    htmlFor="img"
                    className={`${
                        images.length
                            ? 'bg-gradient-to-r from-sky-50 to-indigo-100'
                            : 'bg-inherit'
                    } flex w-full py-2 justify-between overflow-hidden bg-gray-200 hover:bg-gray-50 cursor-pointer items-center border border-gray-200 rounded-md`}
                >
                    <div className="w-full flex flex-col items-center justify-center">
                        <FiUploadCloud className="iconFontSize" />
                        <p className="text-xs">
                            {images.length
                                ? `Uploaded ${images.length} File`
                                : 'No File'}
                        </p>
                    </div>
                    <input
                        id="img"
                        type="file"
                        className="hidden"
                        multiple={true}
                        name="files"
                        ref={filesInput}
                        onChange={e => {
                            addImageHandler(e.target.files);
                        }}
                        accept="image/png, image/jpeg, image/jpg"
                    />
                </label>
            </div>
        </div>
    );
}
