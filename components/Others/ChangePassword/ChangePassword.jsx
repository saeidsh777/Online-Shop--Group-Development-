'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import DashboardBox from '@/components/Boxes/DashboardBox';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import AuthInput from '@/components/Inputs/AuthInput/AuthInput';
import { AuthContext } from '@/contexts/AuthProvider';
import { resetPassword } from '@/services/auth';
import { optionsHookForm } from '@/utils/constants';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';

import styles from './ChangePassword.module.css';

export default function ChangePassword() {
    const { Handlers } = useContext(AuthContext);
    const [showInputs, setShowInputs] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {
        const { res, result } = await resetPassword(data);

        if (res.status === 201) {
            toast.success(result.message);
            Handlers.LogoutHandler();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className={styles.background_yellow_line}>
            <div className="grid grid-cols-2">
                <div className="flex justify-center items-center">
                    {showInputs ? (
                        <DashboardBox
                            className={`w-full shadow-md ${styles.animation}`}
                        >
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-gray-500">
                                            Change Password
                                        </p>
                                        <FaXmark
                                            className="iconFontSize text-dashboard-text cursor-pointer"
                                            onClick={() => setShowInputs(false)}
                                        />
                                    </div>
                                    <hr />
                                </div>
                                <div>
                                    <div className="w-full mb-5">
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium leading-6 text-gray-500"
                                            >
                                                New Password
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
                                    <div className="w-full">
                                        <div>
                                            <label
                                                htmlFor="prevPassword"
                                                className="block text-sm font-medium leading-6 text-gray-500"
                                            >
                                                Previous Password
                                            </label>
                                        </div>
                                        <AuthInput
                                            type="password"
                                            name="prevPassword"
                                            register={{
                                                ...register(
                                                    'prevPassword',
                                                    optionsHookForm.prvPassword
                                                ),
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DashboardBTN
                                        type="button"
                                        className="bg-gray-400"
                                        onClick={() => setShowInputs(false)}
                                    >
                                        Cancel
                                    </DashboardBTN>
                                    <DashboardBTN type="submit">
                                        Confirm
                                    </DashboardBTN>
                                </div>
                            </form>
                        </DashboardBox>
                    ) : (
                        <div
                            className={`w-[10rem] h-[10rem] rounded-full bg-yellow-100 border-8 border-yellow-500 flex flex-col justify-center items-center cursor-pointer shadow-lg ${styles.animation} ${styles.hover} `}
                            onClick={() => setShowInputs(true)}
                        >
                            <p className="font-bold text-yellow-500">Change</p>
                            <p className="font-bold text-yellow-500">
                                Password
                            </p>
                        </div>
                    )}
                </div>
                <div>
                    <Image
                        className="w-full h-full"
                        height={500}
                        width={500}
                        src="/images/change-password.svg"
                        alt="Change Password Image"
                    />
                </div>
            </div>
        </div>
    );
}
