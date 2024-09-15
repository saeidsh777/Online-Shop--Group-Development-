export default function CategoryInputs({ name, _id, value, setData, isValid }) {
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
        <div className="flex items-center gap-2">
            <label htmlFor={name + _id} className="text-md">
                {name}:
            </label>

            <div>
                <input
                    id={name + _id}
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="General_Input_1"
                />
            </div>
        </div>
    );
}
