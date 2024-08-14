import InputValidationError from '@/components/Alert/InputValidationError/InputValidationError';

export default function AuthInput({ register, type, errors }) {
    return (
        <div className="mt-2 relative">
            <input type={type} {...register} className="Auth_Input" />
            {errors.email && (
                <InputValidationError
                    title={errors.email.message}
                    textColorClassName="text-red-500"
                />
            )}
        </div>
    );
}
