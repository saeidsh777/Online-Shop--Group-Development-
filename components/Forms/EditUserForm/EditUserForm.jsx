'use client';
import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import AuthInput from '@/components/Inputs/AuthInput/AuthInput';
import { getUserByEmail } from '@/services/user';
import { optionsHookForm } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditUserForm() {
    const searchParams = useSearchParams();
    const userEmail = searchParams.get('email');
    const [editMode, setEditMode] = useState(false);
    const [changed, setChanged] = useState(false);
    const [userData, setEUserData] = useState({});
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: 'Loading Name...',
            email: 'Loading Email...',
            phoneNumber: 'Loading Phone Number...',
        },
    });

    useEffect(() => {
        const userInformation = async () => {
            const { res, result } = await getUserByEmail(userEmail);
            if (res.status == 200) {
                setEUserData(result);
                reset({
                    name: result.name,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                });
            }
        };
        userInformation();
    }, []);

    const onSubmit = data => {
        console.log(data);
    };

    const onChange = data => {
        if (
            data.name == userData.name &&
            data.email == userData.email &&
            data.phoneNumber == userData.phoneNumber
        ) {
            setChanged(false);
        } else {
            setChanged(true);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleSubmit(onChange)}
        >
            <div className="mb-3">
                <label
                    className="block text-sm font-medium leading-6 text-gray-500"
                    htmlFor="name"
                >
                    Name
                </label>
                <div className="mt-2">
                    <AuthInput
                        type="text"
                        name="name"
                        register={{
                            ...register('name', optionsHookForm.name),
                        }}
                        errors={errors}
                        disabled={editMode ? false : true}
                    />
                </div>
            </div>
            <div className="mb-3">
                <label
                    className="block text-sm font-medium leading-6 text-gray-500"
                    htmlFor="name"
                >
                    Email
                </label>
                <div className="mt-2">
                    <AuthInput
                        type="text"
                        name="email"
                        register={{
                            ...register('email', optionsHookForm.email),
                        }}
                        errors={errors}
                        disabled={editMode ? false : true}
                    />
                </div>
            </div>
            <div className="mb-3">
                <label
                    className="block text-sm font-medium leading-6 text-gray-500"
                    htmlFor="name"
                >
                    Phone Number
                </label>
                <div className="mt-2">
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
                        disabled={editMode ? false : true}
                    />
                </div>
            </div>
            <div className="mt-12">
                {editMode ? (
                    <div className="flex gap-3">
                        <DashboardBTN
                            onClick={() => setEditMode(false)}
                            className="bg-gray-400 hover:bg-gray-500"
                        >
                            Cancel
                        </DashboardBTN>
                        <DashboardBTN
                            onClick={() => setEditMode(true)}
                            disabled={changed ? false : true}
                            className="disabled:bg-gray-200"
                        >
                            Save
                        </DashboardBTN>
                    </div>
                ) : (
                    <DashboardBTN onClick={() => setEditMode(true)}>
                        Edit
                    </DashboardBTN>
                )}
            </div>
        </form>
    );
}
