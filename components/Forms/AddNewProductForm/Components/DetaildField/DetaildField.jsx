import { ProductContext } from '@/contexts/ProductProvider';
import { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

export default function DetaildField({ name, value, description, _id }) {
    const { setFixedInputs } = useContext(ProductContext);

    const nameId = crypto.randomUUID();
    const valueId = crypto.randomUUID();
    const descriptionId = crypto.randomUUID();

    const onChangeName = e => {
        setFixedInputs(prv => {
            return {
                ...prv,
                detailFields: prv.detailFields.map(field => {
                    if (field._id !== _id) return field;
                    return {
                        ...field,
                        name: e.target.value,
                    };
                }),
            };
        });
    };

    const onChangeValue = e => {
        setFixedInputs(prv => {
            return {
                ...prv,
                detailFields: prv.detailFields.map(field => {
                    if (field._id !== _id) return field;
                    return {
                        ...field,
                        value: e.target.value,
                    };
                }),
            };
        });
    };

    const onChangeDescription = e => {
        setFixedInputs(prv => {
            return {
                ...prv,
                detailFields: prv.detailFields.map(field => {
                    if (field._id !== _id) return field;
                    return {
                        ...field,
                        description: e.target.value,
                    };
                }),
            };
        });
    };

    const deleteField = fieldID => {
        setFixedInputs(prv => {
            return {
                ...prv,
                detailFields: prv.detailFields.filter(
                    field => field._id !== fieldID
                ),
            };
        });
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 bg-gray-100 rounded-lg p-2">
            <div>
                <div>
                    <label htmlFor={nameId} className="text-sm">
                        Name:
                    </label>
                    <div>
                        <input
                            id={nameId}
                            value={name}
                            onChange={onChangeName}
                            type="text"
                            className="General_Input_1"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor={valueId} className="text-sm">
                        Value:
                    </label>
                    <div className="flex items-center gap-1">
                        <input
                            id={valueId}
                            value={value}
                            onChange={onChangeValue}
                            type="text"
                            className="General_Input_1"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor={descriptionId} className="text-sm">
                        Description:
                    </label>
                    <div className="flex items-center gap-1">
                        <textarea
                            id={descriptionId}
                            value={description}
                            onChange={onChangeDescription}
                            rows={4}
                            type="text"
                            className="General_Input_1"
                        />
                        <AiOutlineDelete
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => deleteField(_id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
