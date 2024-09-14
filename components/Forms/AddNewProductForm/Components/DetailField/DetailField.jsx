'use client';
import { AiOutlineDelete } from 'react-icons/ai';

export default function DetailField({
    name,
    value,
    description,
    _id,
    setFixedInputs,
    disabled,
}) {
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
                            disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
                            value={description}
                            onChange={onChangeDescription}
                            rows={4}
                            type="text"
                            className="General_Input_1"
                        />
                        <button
                            disabled={disabled}
                            className={` ${
                                disabled
                                    ? 'text-gray-400'
                                    : 'cursor-pointer hover:text-red-500'
                            }`}
                            onClick={() => deleteField(_id)}
                        >
                            <AiOutlineDelete />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
