'use client';
import { AuthContext } from '@/contexts/AuthProvider';
import React, { useContext } from 'react';
import ChangePassword from '../Others/ChangePassword/ChangePassword';
import styles from './AdminProfile.module.css';

export default function AdminProfile() {
    const { User } = useContext(AuthContext);

    return (
        <>
            <ul className="flex flex-wrap mb-5">
                <li className="bg-gray-200 flex-1">
                    <div className={`${styles.clip_path} bg-gray-100 p-3`}>
                        <p className="font-bold text-sm text-nowrap text-gray-400">
                            Name:
                        </p>
                        <p className="text-gray-500 font-bold text-nowrap">
                            {User.details.name}
                        </p>
                    </div>
                </li>
                <li className="bg-gray-100 flex-grow-[1.5]">
                    <div className={`${styles.clip_path} bg-gray-200 p-3`}>
                        <p className="font-bold text-sm text-nowrap text-gray-400">
                            Email:
                        </p>
                        <p className="text-gray-500 font-bold text-nowrap">
                            {User.details.email}
                        </p>
                    </div>
                </li>
                <li className="bg-gray-200 flex-1">
                    <div className={`${styles.clip_path} bg-gray-100 p-3`}>
                        <p className="font-bold text-sm text-nowrap text-gray-400">
                            Phone Number:
                        </p>
                        <p className="text-gray-500 font-bold text-nowrap">
                            {User.details.phoneNumber}
                        </p>
                    </div>
                </li>
                <li className="bg-gray-200 flex-1">
                    <div className={`${styles.clip_path} bg-gray-200 p-3`}>
                        <p className="font-bold text-sm text-nowrap text-gray-400">
                            Role:
                        </p>
                        <p className="text-gray-500 font-bold text-nowrap">
                            {User.details.role}
                        </p>
                    </div>
                </li>
            </ul>
            <ChangePassword />
        </>
    );
}
