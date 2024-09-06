'use client';

import GetToken from '@/hooks/useToken';
import { getUserInfo } from '@/services/user';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        const _15min = 900_000;

        const getDataHandler = () => {
            setLoading(true);
            const Token = GetToken();
            if (!Token) return setLoading(false);

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
        };
        getDataHandler();
        const Interval = setInterval(getDataHandler, _15min);
        return () => {
            clearInterval(Interval);
        };
    }, [setInfo]);
    return (
        <div className="flex items-center gap-2">
            {loading ? (
                'loading'
            ) : (
                <div className="flex flex-col">
                    <span className="text-dashboard-title capitalize font-medium">
                        {info?.name ? info.name : 'BRUH'}
                    </span>
                    <span>{info?.phoneNumber ? info.phoneNumber : 'BRUH'}</span>
                </div>
            )}

            <div className="cursor-pointer bg-dashboard-bg rounded p-2.5  hover:bg-[#dbe0e5] transition-colors">
                {/* replace it with avatar image */}
                <div
                    className="rounded-full aspect-square w-5 425:w-6 sm:w-7 md:w-8 lg:w-9 1152:w-10 border border-dashboard-text cursor-pointer hover:bg-dashboard-sidebar-textActive
    "
                ></div>
            </div>
        </div>
    );
};
export default UserInfoBox;
