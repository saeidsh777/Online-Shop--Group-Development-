export default function AuthInput({ register, type, errors }) {
    return (
        <div className="mt-2 relative">
            {type === 'email' && (
                <>
                    <input
                        type="text"
                        {...register('email', {
                            required: 'The email is not valid',
                            pattern:
                                /^(?=.{1,256})(?=.{1,64}@.{1,255}$)(?=\S+$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/,
                        })}
                        className="block w-full px-3 py-3 rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                        <span className="text-[.7rem] absolute top-10 ps-2 text-red-500">
                            The email is not valid
                        </span>
                    )}
                </>
            )}

            {type === 'name' && (
                <>
                    <input
                        type="text"
                        {...register('name', {
                            required: 'Enter more than 5 characters',
                            minLength: 5,
                        })}
                        className="block w-full px-3 py-3 rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                    />
                    {errors.name && (
                        <span className="text-[.7rem] absolute top-10 ps-2 text-red-500">
                            Enter more than 5 characters
                        </span>
                    )}
                </>
            )}

            {type === 'phoneNumber' && (
                <>
                    <input
                        type="text"
                        {...register('phoneNumber', {
                            required: 'Please enter a valid phone number',
                            pattern: /^09[0-9]{9}$/i,
                        })}
                        className="block w-full px-3 py-3 rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                    />
                    {errors.phoneNumber && (
                        <span className="text-[.7rem] absolute top-10 ps-2 text-red-500">
                            Please enter a valid phone number
                        </span>
                    )}
                </>
            )}

            {type === 'password' && (
                <>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Enter more than 8 characters',
                            minLength: 8,
                        })}
                        className="block w-full px-3 py-3 rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                    />
                    {errors.password && (
                        <span className="text-[.7rem] absolute top-10 ps-2 text-red-500">
                            Enter more than 8 characters
                        </span>
                    )}
                </>
            )}
        </div>
    );
}
