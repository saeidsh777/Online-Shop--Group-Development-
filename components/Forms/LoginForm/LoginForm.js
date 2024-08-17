'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import AuthInput from '../../Inputs/AuthInput/AuthInput';
import SubmitBtn from '../../Buttons/SubmitBtn/SubmitBtn';
import { API_BASE_URL, optionsHookForm } from '@/utils/constants';

export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });
        const result = await res.json();

        if (res.status === 200) {
            resetField('phoneNumber');
            resetField('password');
            toast.success(result.message);
            localStorage.setItem('token', result.token);
            router.push('/');
        }
        if (res.status === 400) {
            toast.error(result.message + "!");
        }
        if (res.status === 401) {
            toast.error(result.message + '!');
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
                                    Phone number
                                </label>
                                <AuthInput
                                    type="text"
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
                                <SubmitBtn title="Login" />
                            </div>
                        </form>
                    </div>
                </div>
                <Toaster
                    toastOptions={{
                        success: {
                            style: {
                                background: '#dcfce7',
                                color: '#15803d',
                                fontSize: '.8rem',
                                padding: '1rem',
                                border: '1px solid #4ade80',
                            },
                            iconTheme: {
                                primary: '#4ade80',
                                secondary: '#15803d',
                            },
                        },
                        error: {
                            style: {
                                background: '#fee2e2',
                                color: '#f87171',
                                fontSize: '.8rem',
                                padding: '1rem',
                                border: '1px solid #fca5a5',
                            },
                            iconTheme: {
                                primary: '#f87171',
                                secondary: '#dc2626',
                            },
                        },
                    }}
                />
            </div>
        </>
    );
}
