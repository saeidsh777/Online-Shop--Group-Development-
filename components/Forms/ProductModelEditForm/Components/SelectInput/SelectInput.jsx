'use client';
export default function SelectInput({
    name,
    variantOptions,
    value,
    _id,
    setData,
    editMode,
}) {
    const onChange = e => {
        setData(prv => {
            return {
                ...prv,
                fields: prv.fields.map(field => {
                    if (field._id !== _id) return field;
                    return {
                        ...field,
                        value: e.target.value,
                    };
                }),
            };
        });
    };
    return (
        <div className="flex items-center gap-2 mb-2">
            <label htmlFor={name + _id} className="text-md">
                {name}:
            </label>
            <div>
                <select
                    name={name}
                    id={name + _id}
                    value={value}
                    onChange={onChange}
                    disabled={editMode}
                    className={`General_Input_1`}
                >
                    <option value="-1">select {name}</option>
                    {variantOptions.map(option => (
                        <option value={option} key={crypto.randomUUID()}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
