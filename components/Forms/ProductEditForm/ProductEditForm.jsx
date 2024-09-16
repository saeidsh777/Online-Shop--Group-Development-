'use client';
import { useEffect, useState } from 'react';
import ProductImages from '../AddNewProductForm/Components/ProductImages/ProductImages';
import defaultImage from '../../../public/images/default-image-product.svg';
import toast from 'react-hot-toast';
import { editProduct } from '@/services/product';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DetailField from '../AddNewProductForm/Components/DetailField/DetailField';

export default function ProductEditForm({
    _id,
    productTitle,
    productDescription,
    productImagesDefault,
    productDetails,
}) {
    const [productImages, setProductImages] = useState({
        image0: defaultImage,
        image1: defaultImage,
        image2: defaultImage,
        image3: defaultImage,
    });
    const [images, setImages] = useState([]);

    const [fixedInputs, setFixedInputs] = useState({
        name: productTitle,
        description: productDescription,
        detailFields: productDetails,
        isValid: false,
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        let newUrlImages = {};
        productImagesDefault.forEach((urlImage, index) => {
            newUrlImages['image' + index] = '/' + urlImage;
        });
        setProductImages(prv => {
            return {
                ...prv,
                ...newUrlImages,
            };
        });
    }, []);

    const onChangeFixedInputs = datas => {
        setFixedInputs(prv => {
            return {
                ...prv,
                ...datas,
            };
        });
    };

    const formDataGenarator = () => {
        const formData = new FormData();
        formData.append('title', fixedInputs.name);
        formData.append('description', fixedInputs.description);
        if (fixedInputs.detailFields.length > 0) {
            fixedInputs.detailFields.forEach((item, index) => {
                formData.append(`details[${index}][name]`, item.name);
                formData.append(`details[${index}][value]`, item.value);
                formData.append(
                    `details[${index}][description]`,
                    item.description
                );
            });
        }
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        return formData;
    };

    const submitHandler = async e => {
        e.preventDefault();
        const { res, result } = await editProduct(formDataGenarator, _id);
        if (res.status === 201) {
            toast.success(result.message);
            setEditMode(false);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <form name="add-new-product" onSubmit={submitHandler}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
                <div className="p-4 border border-gray-200 rounded-xl">
                    {/* Product Name */}
                    <div className="mb-3">
                        <label className="text-sm" htmlFor="name">
                            Product Name <span className="text-red-400">*</span>
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
                                disabled={editMode ? false : true}
                                value={fixedInputs?.name}
                                onChange={e =>
                                    onChangeFixedInputs({
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="mb-5">
                        <label className="text-sm" htmlFor="description">
                            Product Description{' '}
                            <span className="text-red-400">*</span>
                        </label>
                        <div className="mt-2">
                            <textarea
                                rows={10}
                                id="description"
                                type="text"
                                disabled={editMode ? false : true}
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
                                    className="bg-gray-200 text-gray-500 px-2 py-1 text-sm rounded-sm hover:shadow disabled:bg-gray-100 disabled:text-gray-300"
                                    disabled={editMode ? false : true}
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
                                        toast.success('New Field Added');
                                    }}
                                >
                                    Add Field
                                </button>
                            )}
                        </div>

                        {!!fixedInputs.detailFields.length ? (
                            fixedInputs.detailFields.map(field => (
                                <div className="mt-3" key={field._id}>
                                    <DetailField
                                        {...field}
                                        setFixedInputs={setFixedInputs}
                                        disabled={!editMode}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center my-2">
                                <button
                                    type="button"
                                    className="bg-gray-200 w-full text-gray-500 py-2 text-sm rounded-sm hover:shadow disabled:bg-gray-100 disabled:text-gray-300"
                                    disabled={editMode ? false : true}
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
                                        toast.success('New Field Added');
                                    }}
                                >
                                    Add Field
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between p-4 border border-gray-200 rounded-xl">
                    <ProductImages
                        productImages={productImages}
                        setProductImages={setProductImages}
                        images={images}
                        setImages={setImages}
                        disabled={!editMode}
                    />
                    {editMode ? (
                        <div className="flex items-center gap-2">
                            <DashboardBTN
                                className="w-full bg-gray-400"
                                type="button"
                                onClick={() => {
                                    setFixedInputs(prv => {
                                        return {
                                            ...prv,
                                            detailFields: productDetails,
                                        };
                                    });
                                    setEditMode(false);
                                }}
                            >
                                Cancel
                            </DashboardBTN>
                            <DashboardBTN className="w-full">Save</DashboardBTN>
                        </div>
                    ) : (
                        <DashboardBTN
                            className="w-full"
                            onClick={() => setEditMode(true)}
                            type="button"
                        >
                            Edit
                        </DashboardBTN>
                    )}
                </div>
            </div>
        </form>
    );
}
