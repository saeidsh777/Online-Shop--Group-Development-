export default function AuthInput({ value, onChange, type, id }) {
    return (
        <div className="mt-2">
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={e => onChange(id, e.target.value)}
                required
                autoComplete={type}
                className="block w-full px-3 py-3 rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
            />
        </div>
    );
}
