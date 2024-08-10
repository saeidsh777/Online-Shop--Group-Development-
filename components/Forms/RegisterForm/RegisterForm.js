'use client';

import Link from 'next/link';
import AuthInput from '../../Inputs/AuthInput/AuthInput';
import { useForm } from '@/hooks/useForm';
import SubmitBtn from '../../Buttons/SubmitBtn/SubmitBtn';

export default function RegisterForm() {
    
    const [formState, onChangeHandled] = useForm({
        name:"",
        email: '',
        phoneNumber:"",
        password: '',
    });

    const onSubmitHandler = async e => {
        e.preventDefault();

        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ ...formState.inputs }),
        });
        console.log(res);

        //The Next method does not work
        // const result = await res.json();

        // write your code
        // .....
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
                        <form onSubmit={onSubmitHandler} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-500"
                                >
                                    Your Name
                                </label>
                                <AuthInput
                                    type="text"
                                    id="name"
                                    value={formState.inputs.name}
                                    onChange={onChangeHandled}
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
                                    type="email"
                                    id="email"
                                    value={formState.inputs.email}
                                    onChange={onChangeHandled}
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
                                    id="phoneNumber"
                                    value={formState.inputs.phoneNumber}
                                    onChange={onChangeHandled}
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
                                    id="password"
                                    value={formState.inputs.password}
                                    onChange={onChangeHandled}
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
