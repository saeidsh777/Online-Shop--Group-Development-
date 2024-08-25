'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { optionsHookForm } from '@/utils/constants';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubmitBtn from '../../Buttons/SubmitBtn/SubmitBtn';
import AuthInput from '../../Inputs/AuthInput/AuthInput';
import { registerAuth } from '@/services/auth';

export default function RegisterForm() {
    const router = useRouter();

    const {
        register,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {
        const { res, result, err } = await registerAuth(data);

        if (res.status === 201) {
            resetField('name');
            resetField('email');
            resetField('phoneNumber');
            resetField('password');
            toast.success(result.message);
            localStorage.setItem('token', result.token);
            router.push('/');
        } else if (res.status === 500) {
            toast.error(err + '!');
        } else {
            toast.error(result.message + '!');
        }
    };

    return (
        <>
            <Link
                href="/"
                className="group h-[3rem] bg-blue-100 sm:w-[30rem] w-[90%] flex items-center justify-center rounded-xl hover:bg-blue-500"
            >
                <h2 className="font-bold text-lg text-blue-500 group-hover:text-white ">
                    HOME
                </h2>
            </Link>

            <div className="sm:w-[30rem] w-[90%] border rounded-lg bg-white p-8">
                <div className="flex min-h-full flex-1 flex-col justify-center">
                    <div className="flex items-center justify-between sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign up
                        </h2>
                        <Link
                            className="text-sm  text-blue-500 hover:text-blue-600"
                            href="/auth/login"
                        >
                            Already have an account?
                        </Link>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-500"
                                >
                                    Your Name
                                </label>
                                <AuthInput
                                    type="text"
                                    name="name"
                                    register={{
                                        ...register(
                                            'name',
                                            optionsHookForm.name
                                        ),
                                    }}
                                    errors={errors}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-500"
                                >
                                    Email address
                                </label>
                                <AuthInput
                                    type="text"
                                    name="email"
                                    register={{
                                        ...register(
                                            'email',
                                            optionsHookForm.email
                                        ),
                                    }}
                                    errors={errors}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-sm font-medium leading-6 text-gray-500"
                                >
                                    Phone Number
                                </label>
                                <AuthInput
                                    type="text"
                                    name="phoneNumber"
                                    register={{
                                        ...register(
                                            'phoneNumber',
                                            optionsHookForm.phoneNumber
                                        ),
                                    }}
                                    errors={errors}
                                />
                            </div>

                            <div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-500"
                                    >
                                        Password
                                    </label>
                                </div>
                                <AuthInput
                                    type="password"
                                    name="password"
                                    register={{
                                        ...register(
                                            'password',
                                            optionsHookForm.password
                                        ),
                                    }}
                                    errors={errors}
                                />
                            </div>

                            <div>
                                <SubmitBtn title="Create Account" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
