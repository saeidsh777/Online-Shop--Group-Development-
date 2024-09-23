'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AuthContext } from '@/contexts/AuthProvider';
import { login } from '@/services/auth';
import { optionsHookForm } from '@/utils/constants';
import { useContext } from 'react';
import SubmitBtn from '../../Buttons/SubmitBtn/SubmitBtn';
import AuthInput from '../../Inputs/AuthInput/AuthInput';

export default function LoginForm() {
    const { Handlers } = useContext(AuthContext);
    const router = useRouter();
    const params = useSearchParams();

    const {
        register,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {
        const { res, result, err } = await login(data);

        if (res.status === 200) {
            await Handlers.LoginHandler(result.token);
            toast.success(result.message);
            resetField('phoneNumber');
            resetField('password');

            router.push(params.get('from') ?? '/');
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
                                <SubmitBtn title="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
