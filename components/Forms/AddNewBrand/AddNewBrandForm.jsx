'use client';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import DashboardInput from '@/components/Inputs/DashboardInput/DashboardInput';
import useAddBrand from '@/hooks/useAddBrand';
import { useState, useRef, useEffect } from 'react';

const AddNewBrandForm = () => {
    const { formAction, categories, selectedCategories, addCategory, removeCategory, Refs } = useAddBrand();
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // filtering categories by input search
    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCategorySearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategorySelect = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        if (category) {
            addCategory(category);
            setSearchTerm('');
            // close tab after click
            if (dropdownRef.current) {
                dropdownRef.current.style.display = 'none';
            }
        }
    };

    // event handler for close tab for outside click
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            dropdownRef.current.style.display = 'none';
        }
    };

    // focus when we have click on inputs
    const handleFocus = () => {
        dropdownRef.current.style.display = 'block';
    };

    // event handler for close tab
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <form
            onSubmit={formAction}
            className="flex flex-col items-start gap-2.5 md:gap-3 1152:gap-4"
        >
            <div className="flex items-center w-full gap-1">
                <DashboardInput
                    className="p-3 sm:p-3.5 lg:p-4 lg:px-5 1152:px-6 1152:py-5 flex-1 my-1"
                    placeholder="Brand Name..."
                    name="name"
                    ref={Refs.inputRef}
                />
            </div>

            <div className="mb-3 w-full relative">
                <label className="text-sm mb-2 block" htmlFor="category">
                    Categories <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Search and select categories..."
                    className="General_Input_1 w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={handleCategorySearch}
                    onFocus={handleFocus}
                />
                <div
                    ref={dropdownRef}
                    className=" absolute z-10 w-full bg-white border border-gray-200 rounded shadow mt-1 max-h-40 overflow-y-auto"
                    style={{ display: 'none' }}
                >
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <div
                                key={category._id}
                                className=" px-3 py-2 cursor-pointer hover:bg-blue-100"
                                onClick={() => handleCategorySelect(category._id)}
                            >
                                {category.title}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-gray-500">
                            No categories found
                        </div>
                    )}
                </div>

                {/* show selected tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCategories.map((cat) => (
                        <span
                            key={cat._id}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center justify-center space-x-2"
                        >
                            <span>{cat.title}</span>
                            <button
                                type="button"
                                onClick={() => removeCategory(cat._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <DashboardBTN
                ref={Refs.buttonRef}
                className="ml-auto disabled:bg-blue-400 disabled:cursor-wait mt-3"
                type="submit"
            >
                Add Brand
            </DashboardBTN>
        </form>
    );
};

export default AddNewBrandForm;
