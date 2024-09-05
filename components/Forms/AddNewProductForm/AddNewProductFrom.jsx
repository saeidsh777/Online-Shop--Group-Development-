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
                        discountType: '-1',
                        discount: '',
                        finalPrice: 0,
                    },
                },
            ]);
        }
    }, [fixedInputs.category]);

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

                </form>
            </DashboardBox>
        </>
    );
}
