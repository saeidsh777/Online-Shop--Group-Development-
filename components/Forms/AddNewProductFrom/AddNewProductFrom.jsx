import React from 'react';

export default function AddNewProductFrom() {
    return (
        <section className="bg-white rounded-xl border-gray-200 border p-6">
            <form className=" grid grid-cols-2 gap-3" name="add-new-product">
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
                                className="block hover:ring-blue-400 w-full p-2 rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus-visible:ring-blue-400 focus-visible:outline focus-visible:outline-blue-50 sm:text-sm sm:leading-6"
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
                                className="block bg-transparent hover:ring-blue-400 w-full p-2 h-[36px] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus-visible:ring-blue-400 focus-visible:outline focus-visible:outline-blue-50 sm:text-sm sm:leading-6 focus-visible:bg-transparent"
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
                        <div className="mt-2">
                            <input
                                id="price"
                                type="text"
                                placeholder="0 $"
                                className="block hover:ring-blue-400 w-full p-2 rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus-visible:ring-blue-400 focus-visible:outline focus-visible:outline-blue-50 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="mb-3 w-[20%]">
                            <label className="text-sm" htmlFor="discountType">
                                Discount Type
                            </label>
                            <div className="mt-2">
                                <select
                                    id="discountType"
                                    className="block bg-transparent hover:ring-blue-400 w-full p-2 h-[36px] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus-visible:ring-blue-400 focus-visible:outline focus-visible:outline-blue-50 sm:text-sm sm:leading-6 focus-visible:bg-transparent"
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
                                    className="block hover:ring-blue-400 w-full p-2 rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus-visible:ring-blue-400 focus-visible:outline focus-visible:outline-blue-50 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl">
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
                                className="block hover:ring-blue-400 w-full p-2 rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus-visible:ring-blue-400 focus-visible:outline focus-visible:outline-blue-50 sm:text-sm sm:leading-6"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}
