'use client';

import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import { AuthContext } from '@/contexts/AuthProvider';
import { login } from '@/services/auth';
import { useCallback, useContext } from 'react';
import toast from 'react-hot-toast';

const Credntials = {
    ADMIN: {
        phoneNumber: '09123456789',
        password: 'admin1234',
    },
    USER: {
        phoneNumber: '09987654321',
        password: 'user1234',
    },
};

const UserInfoBox = () => {
    const { User, Handlers } = useContext(AuthContext);

    const LoginWithCredntials = useCallback(
        async AuthInfo => {
            const { res, result, err } = await login(AuthInfo);

            if (res.status === 200) {
                toast.success(result.message);
                Handlers.LoginHandler(result.token);
            } else if (res.status === 500) {
                toast.error(err + '!');
            } else {
                toast.error(result.message + '!');
            }
        },
        [Handlers]
    );

    return (
        <div className="flex items-center gap-2">
            {User.isLoggedIn ? (
                <div className="flex flex-col">
                    <span className="text-dashboard-title capitalize font-medium">
                        {User.details.phoneNumber}
                    </span>
                    <span>{User.details.role}</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <DashboardBTN
                        onClick={LoginWithCredntials.bind(
                            null,
                            Credntials.ADMIN
                        )}
                    >
                        Login as ADMIN
                    </DashboardBTN>
                    <DashboardBTN
                        onClick={LoginWithCredntials.bind(
                            null,
                            Credntials.USER
                        )}
                    >
                        Login as USER
                    </DashboardBTN>
                </div>
            )}

            {/* replace it with avatar image */}
            {/* <div className="cursor-pointer bg-dashboard-bg rounded p-2.5  hover:bg-[#dbe0e5] transition-colors">
                <div
                    className="rounded-full aspect-square w-5 425:w-6 sm:w-7 md:w-8 lg:w-9 1152:w-10 border border-dashboard-text cursor-pointer hover:bg-dashboard-sidebar-textActive
    "
                ></div>
            </div> */}
        </div>
    );
};
export default UserInfoBox;
