'use client';

import Link from 'next/link';
import AuthInput from '../../Inputs/AuthInput/AuthInput';
import SubmitBtn from '../../Buttons/SubmitBtn/SubmitBtn';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
    const {
        register,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {

        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });

        if (res.status === 201) {
            resetField('name');
            resetField('email');
            resetField('phoneNumber');
            resetField('password');
            const result = await res.json();
        }
    };

    return (
        <>
            <Link
                href="/"
                className="group h-[3rem] bg-blue-100 sm:w-[30rem] w-[90%] flex items-center justify-center rounded-xl hover:bg-blue-500"
            >
                <h2 className="font-black text-lg text-blue-500 group-hover:text-white ">
                    HOME
                </h2>
            </Link>

            <div className="sm:w-[30rem] w-[90%] border rounded-lg bg-white p-8">
                <div className="flex min-h-full flex-1 flex-col justify-center">
                    <div className="flex items-center justify-between sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Login
                        </h2>
                        <Link
                            className="text-sm  text-blue-500 hover:text-blue-600"
                            href="/auth/register"
                        >
                            Don&apos;t have an account?
                        </Link>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-500"
                                >
                                    Email address
                                </label>
                                <AuthInput
                                    type="email"
                                    register={register}
                                    errors={errors}
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-500"
                                    >
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-semibold text-blue-500 hover:text-blue-700"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <AuthInput
                                    type="password"
                                    register={register}
                                    errors={errors}
                                />
                            </div>

                            <div>
                                <SubmitBtn title="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
