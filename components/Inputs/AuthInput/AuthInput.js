import InputValidationError from '@/components/Alert/InputValidationError/InputValidationError';

export default function AuthInput({ register, ...props }) {
    return (
        <div className="mt-2 relative">
            <input {...register} className="Auth_Input" {...props} />
            {props.errors[props.name] && (
                <InputValidationError
                    title={props.errors[props.name].message}
                    textColorClassName="text-red-500"
                />
            )}
        </div>
    );
}
