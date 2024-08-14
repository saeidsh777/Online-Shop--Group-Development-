export default function InputValidationError({ title, textColorClassName }) {
    return (
        <span
            className={`text-[.7rem] absolute top-10 ps-2 text-red-500 ${textColorClassName}`}
        >
            {title}
        </span>
    );
}
