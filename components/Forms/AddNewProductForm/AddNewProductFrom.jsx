'use client';
import { useContext, useEffect } from 'react';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import SubmitBtn from '@/components/Buttons/SubmitBtn/SubmitBtn';
import { getAllCategories } from '@/services/categories';
import { addNewProduct } from '@/services/product';
import toast from 'react-hot-toast';
import { AiFillProduct } from 'react-icons/ai';
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
        setModels,
        onChangeCategory,
        formDataGenarator,
    } = useContext(ProductContext);

    useEffect(() => {
        const categoriesRequestHandler = async () => {
            const { res, result, err } = await getAllCategories();
            res.status === 200
                ? setCategories(result)
                : toast.error(String(err));
        };
        categoriesRequestHandler();

        setModels([
            {
                id: crypto.randomUUID(),
                categoryFiels: [],
                detialFields: [],
                fixedFields: {
                    price: '',
                    count: "",
                    discountType: '-1',
                    discount: '',
                    finalPrice: 0,
                },
            },
        ]);
    }, []);

    useEffect(() => {
        const category = fixedInputs.category;
        if (category._id !== '-1') {
            let productVariantsSchema = [...category.productVariantsSchema].map(
                productVariant => {
                    return { ...productVariant, value: '' };
                }
            );

            let model = {
                _id: crypto.randomUUID(),
                categoryFiels: productVariantsSchema,
                detialFields: [],
                fixedFields: {
                    price: '',
                    count: "",
                    discountType: '-1',
                    discount: '',
                    finalPrice: 0,
                },
            };
            setModels([model]);
        } else {
            setModels([
                {
                    _id: crypto.randomUUID(),
                    categoryFiels: [],
                    detialFields: [],
                    fixedFields: {
                        price: '',
                        count: "",
                        discountType: '-1',
                        discount: '',
                        finalPrice: 0,
                    },
                },
            ]);
        }
    }, [fixedInputs.category]);

    const submitHandler = async e => {
        e.preventDefault();
        console.log(formDataGenarator());
    };

    return (
        <>
            <Step />
            <DashboardBox>
                <form name="add-new-product" onSubmit={submitHandler}>
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

                    {step === 3 && (
                        <div className="p-3 border border-gray-200 rounded-xl mb-5 animation-bg-processing overflow-hidden">
                            <div className="flex justify-center items-center">
                                <div className="flex flex-col items-center relative">
                                    <AiFillProduct className="text-[8rem] text-white animate-pulse" />
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="font-bold text-white">
                                            Product Information Completed
                                            Successfuly{' '}
                                        </p>
                                        <div className="text-2xl text-white w-10 h-10 flex justify-center items-center bg-blue-300 rounded-full animation-appear-from-down">
                                            ✓
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <DashboardBTN
                            type="button"
                            disabled={step <= 1 ? true : false}
                            className="disabled:bg-gray-400"
                            onClick={() => setStep(prv => prv - 1)}
                        >
                            Back
                        </DashboardBTN>
                        {step <= 2 && (
                            <DashboardBTN
                                type="button"
                                disabled={step >= 3 ? true : false}
                                className="disabled:bg-gray-400"
                                onClick={() => setStep(prv => prv + 1)}
                            >
                                Next
                            </DashboardBTN>
                        )}

                        {step === 3 && (
                            <DashboardBTN type="submit">Save</DashboardBTN>
                        )}
                    </div>
                </form>
            </DashboardBox>
        </>
    );
}
