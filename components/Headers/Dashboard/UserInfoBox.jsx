'use client';

import DashboardBTN from '@/components/Buttons/Dashboard/DashboardBTN';
import GetToken from '@/hooks/useToken';
import { login } from '@/services/auth';
import { getUserInfo } from '@/services/user';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UserInfoBox = () => {
    const [info, setInfo] = useState({
        createdAt: 'loading',
        email: 'loading',
        name: 'loading',
        phoneNumber: 'loading',
        role: 'loading',
    });
    const [loading, setLoading] = useState(false);
    const [isBruh, setBurh] = useState(false);

    const getDataHandler = useCallback(() => {
        setLoading(true);
        const Token = GetToken();
        if (!Token) {
            setLoading(false);
            setBurh(true);
            return;
        }

        const User = async token => {
            const user = await getUserInfo(token);
            setLoading(false);
            if ('res' in user) {
                if (user.res.status === 200) {
                    setInfo(user.result);
                    return;
                } else {
                    toast.error(user.result.message);
                    setInfo('Error');

                    return;
                }
            }
            if (typeof user === 'string') {
                setInfo('Error');
                toast.error(user);
            }
        };

        User(Token);
    }, []);

    useEffect(() => {
        const _15min = 900_000;

        getDataHandler();
        const Interval = setInterval(getDataHandler, _15min);
        return () => {
            clearInterval(Interval);
        };
    }, [setInfo, getDataHandler]);
    return (
        <div className="flex items-center gap-2">
            {loading ? (
                'loading'
            ) : !isBruh ? (
                <div className="flex flex-col">
                    <span className="text-dashboard-title capitalize font-medium">
                        {info?.name ? info.name : setBurh(true)}
                    </span>
                    <span>
                        {info?.phoneNumber ? info.phoneNumber : setBurh(true)}
                    </span>
                </div>
            ) : (
                <DashboardBTN
                    onClick={async () => {
                        const data = {
                            phoneNumber: '09123456789',
                            password: 'admin1234',
                        };
                        const { res, result, err } = await login(data);

                        if (res.status === 200) {
                            toast.success(result.message);
                            localStorage.setItem('token', result.token);
                            setBurh(false);
                            getDataHandler();
                        } else if (res.status === 500) {
                            toast.error(err + '!');
                        } else {
                            toast.error(result.message + '!');
                        }
                    }}
                >
                    Login
                </DashboardBTN>
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
