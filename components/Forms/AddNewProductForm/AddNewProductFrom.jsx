'use client';
import { useContext, useEffect } from 'react';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import { getAllCategories } from '@/services/categories';
import toast from 'react-hot-toast';
import { AiFillProduct } from 'react-icons/ai';
import { ProductContext } from '@/contexts/ProductProvider';
import DashboardBox from '@/components/Boxes/DashboardBox';
import Step from '@/components/Forms/AddNewProductForm/Components/Step/Step';
import Link from 'next/link';
import ProductImages from './Components/ProductImages/ProductImages';
import CreateProductModel from './Components/CreateProductModel/CreateProductModel';
import DetailField from './Components/DetailField/DetailField';

export default function AddNewProductForm() {
    const {
        setModelsForCategory,
        fixedInputs,
        setFixedInputs,
        onChangeFixedInputs,
        categories,
        setCategories,
        step,
        setStep,
        ready,
        onChangeCategory,
        completed,
        reset,
        submitHandler,
        productImages,
        setProductImages,
        images,
        setImages,
    } = useContext(ProductContext);

    useEffect(() => {
        const categoriesRequestHandler = async () => {
            const { res, result, err } = await getAllCategories();
            res.status === 200
                ? setCategories(result)
                : toast.error(String(err));
        };
        categoriesRequestHandler();

        setModelsForCategory([]);
    }, []);

    return (
        <>
            <Step />
            <DashboardBox>
                <form name="add-new-product" onSubmit={submitHandler}>
                    {/* Step 1 - START */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
                            <div className="p-4 border border-gray-200 rounded-xl">
                                {/* Product Name */}
                                <div className="mb-3">
                                    <label className="text-sm" htmlFor="name">
                                        Product Name{' '}
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter product name"
                                            className={`General_Input_1 ${
                                                fixedInputs.name.length < 3 &&
                                                'ring-red-400 focus-visible:ring-red-400'
                                            }`}
                                            value={fixedInputs?.name}
                                            onChange={e =>
                                                onChangeFixedInputs({
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="mb-3">
                                    <label
                                        className="text-sm"
                                        htmlFor="category"
                                    >
                                        Category{' '}
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="category"
                                            className={`General_Input_1 h-[36px] ${
                                                fixedInputs.category._id ===
                                                    '-1' &&
                                                'ring-red-400 focus-visible:ring-red-400'
                                            }`}
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

                                {/* Note */}
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

                                {/* Product Description */}
                                <div className="mb-5">
                                    <label
                                        className="text-sm"
                                        htmlFor="description"
                                    >
                                        Product Description{' '}
                                        <span className="text-red-400">*</span>
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
                                            className={`General_Input_1 ${
                                                !fixedInputs.description &&
                                                'ring-red-400 focus-visible:ring-red-400'
                                            }`}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Detial Fields */}
                                <div className="mb-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm block">
                                            Detial Fields:
                                        </span>
                                        {!!fixedInputs.detailFields.length && (
                                            <button
                                                type="button"
                                                className="bg-gray-200 text-gray-500 px-2 py-1 text-sm rounded-sm hover:shadow"
                                                onClick={() => {
                                                    let detialField = {
                                                        _id: crypto.randomUUID(),
                                                        name: '',
                                                        value: '',
                                                        description: '',
                                                    };
                                                    setFixedInputs(prv => {
                                                        return {
                                                            ...prv,
                                                            detailFields: [
                                                                ...prv.detailFields,
                                                                detialField,
                                                            ],
                                                        };
                                                    });
                                                    toast.success(
                                                        'New Field Added'
                                                    );
                                                }}
                                            >
                                                Add Field
                                            </button>
                                        )}
                                    </div>

                                    {!!fixedInputs.detailFields.length ? (
                                        fixedInputs.detailFields.map(field => (
                                            <div
                                                className="mt-3"
                                                key={field._id}
                                            >
                                                <DetailField
                                                    {...field}
                                                    disabled={false}
                                                    setFixedInputs={
                                                        setFixedInputs
                                                    }
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex justify-center items-center my-2">
                                            <button
                                                type="button"
                                                className="bg-gray-200 w-full text-gray-500 py-2 text-sm rounded-sm hover:shadow"
                                                onClick={() => {
                                                    let detialField = {
                                                        _id: crypto.randomUUID(),
                                                        name: '',
                                                        value: '',
                                                        description: '',
                                                    };
                                                    setFixedInputs(prv => {
                                                        return {
                                                            ...prv,
                                                            detailFields: [
                                                                ...prv.detailFields,
                                                                detialField,
                                                            ],
                                                        };
                                                    });
                                                    toast.success(
                                                        'New Field Added'
                                                    );
                                                }}
                                            >
                                                Add Field
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Images */}
                            <div className="p-4 border border-gray-200 rounded-xl">
                                <ProductImages
                                    productImages={productImages}
                                    setProductImages={setProductImages}
                                    images={images}
                                    setImages={setImages}
                                    disabled={false}
                                />
                            </div>
                        </div>
                    )}
                    {/* Step 1 - END */}

                    {/* Step 2 - START */}
                    {step === 2 && <CreateProductModel />}
                    {/* Step 2 - END */}

                    {/* Step 3 - START */}
                    {step === 3 && (
                        <div className="p-3 border border-gray-200 rounded-xl mb-5 animation-bg-processing overflow-hidden h-[15rem]">
                            <div className="flex justify-center items-center h-full">
                                <div className="flex flex-col items-center relative">
                                    {completed ? (
                                        <div className="text-[4rem] text-white w-20 h-20 flex justify-center items-center bg-blue-300 rounded-full animation-appear-from-up mb-5">
                                            ✓
                                        </div>
                                    ) : (
                                        <AiFillProduct className="text-[8rem] text-white animate-pulse" />
                                    )}
                                    <p className="font-bold text-white">
                                        {completed
                                            ? 'Completed'
                                            : 'Product Information Completed Successfuly'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Step 1 - END */}

                    <div className="flex items-center gap-2">
                        {completed ? (
                            <DashboardBTN
                                type="button"
                                className="disabled:bg-gray-400"
                                onClick={() => {
                                    reset();
                                }}
                            >
                                Create New Product
                            </DashboardBTN>
                        ) : (
                            <>
                                <DashboardBTN
                                    type="button"
                                    disabled={step <= 1 ? true : false}
                                    className="disabled:bg-gray-400"
                                    onClick={() => setStep(prv => prv - 1)}
                                >
                                    Back
                                </DashboardBTN>
                                {step === 1 && (
                                    <DashboardBTN
                                        type="button"
                                        disabled={
                                            step > 2 ||
                                            fixedInputs.name.length < 3 ||
                                            fixedInputs.category._id === '-1' ||
                                            fixedInputs.description.length === 0
                                                ? true
                                                : false
                                        }
                                        className="disabled:bg-gray-400"
                                        onClick={() => setStep(prv => prv + 1)}
                                    >
                                        Next
                                    </DashboardBTN>
                                )}
                                {step === 2 && (
                                    <DashboardBTN
                                        type="button"
                                        disabled={ready ? false : true}
                                        className="disabled:bg-gray-400"
                                        onClick={() => setStep(prv => prv + 1)}
                                    >
                                        Next
                                    </DashboardBTN>
                                )}

                                {step === 3 && (
                                    <DashboardBTN type="submit">
                                        Save
                                    </DashboardBTN>
                                )}
                            </>
                        )}
                    </div>
                </form>
            </DashboardBox>
        </>
    );
}
