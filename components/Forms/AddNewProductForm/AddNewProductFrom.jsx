'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import defaultImage from '../../../public/images/default-image-product.svg';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import SubmitBtn from '@/components/Buttons/SubmitBtn/SubmitBtn';
import useProduct from '@/hooks/useProduct';
import { getAllCategories } from '@/services/categories';
import { addNewProduct, editProduct, getOneProduct } from '@/services/product';
import { justNumberRegex } from '@/utils/regex';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiUploadCloud } from 'react-icons/fi';

export default function AddNewProductForm({ init }) {
    const {
        inputs,
        onChange,
        productImages,
        setProductImages,
        images,
        setImages,
        editMode,
        setEditMode,
        formDataGenarator,
    } = useProduct();
    const filesInput = useRef();
    const productImagesElm = useRef([]);

    useEffect(() => {
        const categoriesRequestHandler = async () => {
            const { res, result } = await getAllCategories();
            res.status === 200 && onChange({ categories: result });
        };
        categoriesRequestHandler();

        if (init.type === 'edit') {
            const getProductHandler = async () => {
                const { res, result } = await getOneProduct(init.productId);
                if (res.status === 200) {
                    onChange({
                        name: result.title,
                        category: result.category.id,
                        discount:
                            result.discount === 0
                                ? ''
                                : String(result.discount),
                        discountType:
                            result.discount === 0 ? '-1' : 'Numerical',
                        price: result.price,
                        description: result.description,
                        finalPrice: result.price - result.discount,
                    });
                    result.images.forEach((image, index) => {
                        setProductImages(prv => {
                            return {
                                ...prv,
                                ['image' + index]: '/' + image,
                            };
                        });
                    });
                } else {
                    console.log(result);
                }
            };
            getProductHandler();
        }
    }, []);

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

    // Product discount calculation
    const discountHandler = value => {
        // For numeric discountType
        if (inputs.discountType === 'Numerical') {
            if (inputs.price - +value >= 0) {
                onChange({ finalPrice: +inputs.price - +value });
            } else {
                onChange({ finalPrice: +inputs.price - +inputs.price });
            }
        }

        // For numeric Percentage
        if (inputs.discountType === 'Percentage') {
            if (value >= 100) {
                onChange({ finalPrice: 0 });
            } else if (value <= 0) {
                onChange({ finalPrice: +inputs.price });
            } else {
                onChange({
                    finalPrice: +inputs.price - (+inputs.price * +value) / 100,
                });
            }
        }
    };

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

    const submitHandler = async e => {
        e.preventDefault();

        if (init.type === 'new') {
            const { res, result, err } = await addNewProduct(formDataGenarator);
            if (res.status === 201) {
                onChange({
                    name: '',
                    category: '',
                    price: '',
                    discountType: '-1',
                    description: '',
                    discount: '',
                    finalPrice: 0,
                });
                setImages([]);
                setProductImages({
                    image0: defaultImage,
                    image1: defaultImage,
                    image2: defaultImage,
                    image3: defaultImage,
                });
                filesInput.current = '';
                productImagesElm.current = [];
                toast.success('Created New Product');
            } else if (res.status === 500) {
                toast.error(err.message + '!');
            } else {
                toast.error(result.message + '!');
            }
        } else if (init.type === 'edit') {
            const { res, result, err } = await editProduct(
                formDataGenarator,
                init.productId
            );
            if (res.status === 201) {
                setEditMode(false);
                toast.success('Edit Product Successfully');
            } else if (res.status === 500) {
                toast.error(err.message + '!');
            } else {
                toast.error(result.message + '!');
            }
        }
    };
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
                            disabled={
                                init.type === 'edit'
                                    ? editMode === false
                                        ? true
                                        : false
                                    : false
                            }
                            onChange={e => onChange({ name: e.target.value })}
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
                            disabled={
                                init.type === 'edit'
                                    ? editMode === false
                                        ? true
                                        : false
                                    : false
                            }
                            onChange={e =>
                                onChange({ category: e.target.value })
                            }
                        >
                            <option value="-1">Select your category</option>
                            {inputs.categories.map(category => (
                                <option
                                    key={category?._id}
                                    value={category?._id}
                                >
                                    {category?.title}
                                </option>
                            ))}
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
                            inputMode="numeric"
                            type="text"
                            disabled={
                                init.type === 'edit'
                                    ? editMode === false
                                        ? true
                                        : false
                                    : false
                            }
                            placeholder="0 $"
                            className="General_Input_1"
                            value={inputs.price}
                            onChange={e => {
                                if (justNumberRegex.test(+e.target.value)) {
                                    onChange({
                                        price: e.target.value,
                                        discount: '',
                                        finalPrice: +e.target.value,
                                    });
                                    if (e.target.value.length == 0) {
                                        onChange({
                                            price: e.target.value,
                                            discount: '',
                                            finalPrice: 0,
                                        });
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
                                disabled={
                                    init.type === 'edit'
                                        ? editMode === false
                                            ? true
                                            : false
                                        : false
                                }
                                onChange={e => {
                                    onChange({
                                        discountType: e.target.value,
                                        discount: '',
                                        finalPrice: +inputs.price,
                                    });
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
                                inputMode="numeric"
                                type="text"
                                placeholder="..."
                                className="General_Input_1"
                                value={inputs?.discount}
                                onChange={e => {
                                    if (justNumberRegex.test(+e.target.value)) {
                                        onChange({ discount: e.target.value });
                                        discountHandler(+e.target.value);
                                        if (e.target.value.length == 0) {
                                            onChange({
                                                discount: '',
                                                finalPrice: +inputs.price,
                                            });
                                        }
                                    }
                                }}
                                disabled={
                                    init.type === 'edit'
                                        ? editMode === false
                                            ? true
                                            : false
                                        : inputs?.discountType == '-1'
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </div>
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
                            disabled={
                                init.type === 'edit'
                                    ? editMode === false
                                        ? true
                                        : false
                                    : false
                            }
                            value={inputs?.description}
                            onChange={e =>
                                onChange({ description: e.target.value })
                            }
                            placeholder="Enter product description ..."
                            className="General_Input_1"
                        ></textarea>
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
                        <span className="ms-4 text-red-300">
                            {inputs.discount
                                ? +inputs.discount < +inputs.price
                                    ? inputs.discountType === 'Percentage'
                                        ? '-' +
                                          (+inputs.price * +inputs.discount) /
                                              100
                                        : '-' +
                                          +inputs.discount.toLocaleString()
                                    : '-' + +inputs.price
                                : 0}
                            {' $'}
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

            <div className="p-4 border flex flex-col justify-between border-gray-200 rounded-xl">
                <div className="flex flex-col gap-2 mb-3">
                    <div className="p-2 md:p-3 lg:p-3.5 bg-[#F3F5F7] w-full rounded-lg flex gap-1.5 md:gap-2 lg:gap-3 sm:flex-col 896:flex-row 896:flex-1">
                        <div
                            className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 ${
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
                                    images[0]
                                        ? 'w-[100%] h-[100%]'
                                        : 'w-[80%] h-[70%]'
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
                        <div className="grid grid-rows-3 gap-2 md:gap-3 lg:gap-3.5  sm:grid-cols-3 sm:grid-rows-1 896:grid-cols-1 896:grid-rows-3 flex-1">
                            <div
                                className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 ${
                                    !images[1] &&
                                    'flex justify-center items-center'
                                }`}
                            >
                                <Image
                                    ref={el =>
                                        (productImagesElm.current['1'] = el)
                                    }
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
                                className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 ${
                                    !images[2] &&
                                    'flex justify-center items-center'
                                }`}
                            >
                                <Image
                                    ref={el =>
                                        (productImagesElm.current['2'] = el)
                                    }
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
                                className={`bg-slate-400 aspect-square rounded-lg flex-[3] overflow-hidden p-1 md:p-2 ${
                                    !images[3] &&
                                    'flex justify-center items-center'
                                }`}
                            >
                                <Image
                                    ref={el =>
                                        (productImagesElm.current['3'] = el)
                                    }
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
                                disabled={
                                    init.type === 'edit'
                                        ? editMode
                                            ? false
                                            : true
                                        : false
                                }
                                onChange={e => {
                                    addImageHandler(e.target.files);
                                }}
                                accept="image/png, image/jpeg, image/jpg"
                            />
                        </label>
                    </div>
                </div>
                {init.type === 'edit' ? (
                    <>
                        {editMode ? (
                            <div className="flex items-center gap-3">
                                <SubmitBtn
                                    title="Cancel"
                                    className="bg-gray-400 hover:bg-gray-500"
                                    onClick={() => setEditMode(false)}
                                />
                                <SubmitBtn title="Save" />
                            </div>
                        ) : (
                            <DashboardBTN onClick={() => setEditMode(true)}>
                                Edit
                            </DashboardBTN>
                        )}
                    </>
                ) : (
                    <SubmitBtn title="Create Product" />
                )}
            </div>
        </form>
    );
}
