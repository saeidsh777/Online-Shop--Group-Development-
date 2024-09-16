export default function ColorInput({ name, value, setData, _id, editMode }) {
    const newId = crypto.randomUUID();

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
            <label htmlFor={name + newId} className="text-md">
                Color:
            </label>
            <div>
                <input
                    id={name + newId}
                    type="color"
                    value={value}
                    onChange={onChange}
                    disabled={editMode}
                    className="General_Input_1 w-20"
                />
            </div>
        </div>
    );
}
