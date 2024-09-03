'use client';
import { useContext, useEffect } from 'react';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import SubmitBtn from '@/components/Buttons/SubmitBtn/SubmitBtn';
import { getAllCategories } from '@/services/categories';
import { addNewProduct } from '@/services/product';
import { justNumberRegex } from '@/utils/regex';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { ProductContext } from '@/contexts/ProductProvider';
import DashboardBox from '@/components/Boxes/DashboardBox';
import Step from '@/components/Forms/AddNewProductForm/Components/Step/Step';
import Link from 'next/link';
import ProductImages from './Components/ProductImages/ProductImages';
import CreateProductModel from './Components/CreateProductModel/CreateProductModel';

export default function AddNewProductForm() {
    const {
        fixedInputs,
        onChangeFixedInputs,
        categories,
        setCategories,
        step,
        setStep,
        models,
        setModels,
        onChangeCategory,
        formDataGenarator,
    } = useContext(ProductContext);

    useEffect(() => {
        const categoriesRequestHandler = async () => {
            const { res, result, err } = await getAllCategories();
            console.log(result);
            res.status === 200
                ? setCategories(result)
                : toast.error(String(err));
        };
        categoriesRequestHandler();
    }, []);

    useEffect(() => {
        console.log(fixedInputs.category);
    }, [fixedInputs.category]);

    // Product discount calculation
    // const discountHandler = value => {
    //     // For numeric discountType
    //     if (inputs.discountType === 'Numerical') {
    //         if (inputs.price - +value >= 0) {
    //             onChange({ finalPrice: +inputs.price - +value });
    //         } else {
    //             onChange({ finalPrice: +inputs.price - +inputs.price });
    //         }
    //     }

    //     // For numeric Percentage
    //     if (inputs.discountType === 'Percentage') {
    //         if (value >= 100) {
    //             onChange({ finalPrice: 0 });
    //         } else if (value <= 0) {
    //             onChange({ finalPrice: +inputs.price });
    //         } else {
    //             onChange({
    //                 finalPrice: +inputs.price - (+inputs.price * +value) / 100,
    //             });
    //         }
    //     }
    // };

    // const submitHandler = async e => {
    //     e.preventDefault();

    //     if (init.type === 'new') {
    //         const { res, result, err } = await addNewProduct(formDataGenarator);
    //         if (res.status === 201) {
    //             onChange({
    //                 name: '',
    //                 category: '',
    //                 price: '',
    //                 discountType: '-1',
    //                 description: '',
    //                 discount: '',
    //                 finalPrice: 0,
    //             });
    //             setImages([]);
    //             setProductImages({
    //                 image0: defaultImage,
    //                 image1: defaultImage,
    //                 image2: defaultImage,
    //                 image3: defaultImage,
    //             });
    //             filesInput.current = '';
    //             productImagesElm.current = [];
    //             toast.success('Created New Product');
    //         } else if (res.status === 500) {
    //             toast.error(err.message + '!');
    //         } else {
    //             toast.error(result.message + '!');
    //         }
    //     } else if (init.type === 'edit') {
    //         const { res, result, err } = await editProduct(
    //             formDataGenarator,
    //             init.productId
    //         );
    //         if (res.status === 201) {
    //             setEditMode(false);
    //             toast.success('Edit Product Successfully');
    //         } else if (res.status === 500) {
    //             toast.error(err.message + '!');
    //         } else {
    //             toast.error(result.message + '!');
    //         }
    //     }
    // };
    return (
        <>
            <Step />
            <DashboardBox>
                <form
                    // className=" grid grid-cols-1 lg:grid-cols-2 gap-3"
                    name="add-new-product"
                    // onSubmit={submitHandler}
                >
                    {step === 1 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
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
                                            value={fixedInputs?.name}
                                            onChange={e =>
                                                onChangeFixedInputs({
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        className="text-sm"
                                        htmlFor="category"
                                    >
                                        Category
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="category"
                                            className="General_Input_1 h-[36px]"
                                            value={fixedInputs.category._id}
                                            onChange={e => onChangeCategory(e)}
                                        >
                                            <option value="-1">
                                                Select your category
                                            </option>
                                            {categories.map(category => (
                                                <option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-5 bg-gray-50 p-2 rounded-md">
                                    <p className="font-bold text-sm">
                                        <span className="text-red-500">*</span>{' '}
                                        What to do if you do not find the
                                        desired category:
                                    </p>

                                    <ul className="mt-1">
                                        <li className="text-sm">
                                            1- Go to{' '}
                                            <Link
                                                href="/dashboard/add-new-category"
                                                className="font-bold underline"
                                            >
                                                Add New Category
                                            </Link>
                                        </li>
                                        <li className="text-sm">
                                            2- Enter your category name
                                        </li>
                                        <li className="text-sm">
                                            3- If you have a product variety,
                                            create and confirm
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-3">
                                    <label
                                        className="text-sm"
                                        htmlFor="description"
                                    >
                                        Product Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            rows={10}
                                            id="description"
                                            type="text"
                                            value={fixedInputs.description}
                                            onChange={e =>
                                                onChangeFixedInputs({
                                                    description: e.target.value,
                                                })
                                            }
                                            placeholder="Enter product description ..."
                                            className="General_Input_1"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-xl">
                                <ProductImages />
                            </div>
                        </div>
                    )}

                    {step === 2 && <CreateProductModel />}

                    <div className="flex items-center gap-2">
                        <DashboardBTN
                            type="button"
                            disabled={step <= 1 ? true : false}
                            className="disabled:bg-gray-400"
                            onClick={() => setStep(prv => prv - 1)}
                        >
                            Back
                        </DashboardBTN>
                        <DashboardBTN
                            type="button"
                            disabled={step >= 3 ? true : false}
                            className="disabled:bg-gray-400"
                            onClick={() => setStep(prv => prv + 1)}
                        >
                            Next
                        </DashboardBTN>
                    </div>
                    {/* <div className="mb-3">
                    <label className="text-sm" htmlFor="price">
                        Price
                    </label>
                    <div className="mt-2 relative Input_Label_Dollar">
                        <input
                            id="price"
                            inputMode="numeric"
                            type="text"
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
                </div> */}
                    {/* <div className="flex flex-col md:flex-row gap-2">
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
                            />
                        </div>
                    </div>
                </div> */}

                    {/* <div className="mt-3">
                    <small className="flex items-center text-sm text-gray-400">
                        Total Price:
                        <span className="ms-4">
                            {inputs.price ? inputs.price.toLocaleString() : 0} $
                        </span>
                    </small>
                </div> */}
                    {/* <div>
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
                </div> */}

                    {/* <div className="mt-3">
                    <small>
                        Final Price:
                        <span className="ms-2 bg-gray-100 px-2 py-1 rounded-lg">
                            {inputs.finalPrice.toLocaleString()} $
                        </span>
                    </small>
                </div> */}
                </form>
            </DashboardBox>
        </>
    );
}
