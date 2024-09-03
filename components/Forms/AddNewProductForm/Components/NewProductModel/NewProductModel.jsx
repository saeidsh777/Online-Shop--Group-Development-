import React from 'react';
import SelectInput from '../SelectInput/SelectInput';
import ColorInput from '../ColorInput/ColorInput';
import CategoryInputs from '../CategoryInputs/CategoryInputs';
import DetialInput from '../DetialInput/DetialInput';

export default function NewProductModel({ _id, categoryFiels, indexModel }) {
    console.log(categoryFiels);
    return (
        <div className="p-3 border border-gray-200 rounded-xl pt-6 relative">
            <span className="bg-blue-200 text-sm p-2 rounded-sm absolute top-[-1.5rem] left-3">
                Model {indexModel + 1}{' '}
            </span>
            {!!categoryFiels.length && (
                <div className="bg-gray-100 rounded-sm p-2 mb-2">
                    <span className="text-sm block mb-5">
                        <sup className="text-red-500">*</sup>Category Fields:
                    </span>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
                        {categoryFiels.map(field => {
                            if (!!field.variantOptions.length) {
                                return <SelectInput key={field._id} {...field}/>;
                            }
                            
                        })}
                        <ColorInput />
                        <CategoryInputs />
                        <CategoryInputs />
                    </div>
                </div>
            )}

            <div className="bg-gray-100 rounded-sm p-2 mb-2">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm block">Detial Fields:</span>
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-500 px-2 py-1 text-sm rounded-sm hover:shadow"
                    >
                        Add Field
                    </button>
                </div>

                <div className="mb-5">
                    <DetialInput />
                </div>
            </div>

            <div className="bg-gray-100 rounded-sm p-2 mb-2">
                <div className="mb-3">
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
                            // value={inputs.price}
                            // onChange={e => {
                            //     if (justNumberRegex.test(+e.target.value)) {
                            //         onChange({
                            //             price: e.target.value,
                            //             discount: '',
                            //             finalPrice: +e.target.value,
                            //         });
                            //         if (e.target.value.length == 0) {
                            //             onChange({
                            //                 price: e.target.value,
                            //                 discount: '',
                            //                 finalPrice: 0,
                            //             });
                            //         }
                            //     }
                            // }}
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
                                // value={inputs?.discountType}
                                // onChange={e => {
                                //     onChange({
                                //         discountType: e.target.value,
                                //         discount: '',
                                //         finalPrice: +inputs.price,
                                //     });
                                // }}
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
                                // value={inputs?.discount}
                                // onChange={e => {
                                //     if (justNumberRegex.test(+e.target.value)) {
                                //         onChange({ discount: e.target.value });
                                //         discountHandler(+e.target.value);
                                //         if (e.target.value.length == 0) {
                                //             onChange({
                                //                 discount: '',
                                //                 finalPrice: +inputs.price,
                                //             });
                                //         }
                                //     }
                                // }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
