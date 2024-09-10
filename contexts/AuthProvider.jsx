'use client';

import { getUserInfo } from '@/services/user';
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

const InitialLocalToken = localStorage.getItem('token');
const InitialValue = {
    isLoggedIn: false,
    token: InitialLocalToken,
    details: {
        email: '',
        name: '',
        phoneNumber: '',
        role: '',
    },
};
export const AuthContext = createContext({
    User: InitialValue,
    Handlers: {
        LoginHandler: () => {},
        LogoutHandler: () => {},
    },
});

const AuthProvider = ({ children }) => {
    const [User, setUser] = useState(InitialValue);

    const Logout = useCallback(() => {
        localStorage.setItem('token', '');
        setUser({ ...InitialValue, token: '' });
    }, [setUser]);

    const TokenChecker = useCallback(
        async token => {
            const response = await getUserInfo(token);

            if ('res' in response && response.res.status === 200) {
                const UserInfo = {};
                Object.entries(response.result).forEach(([key, value]) => {
                    if (key in InitialValue.details) {
                        UserInfo[key] = value;
                    }
                });

                setUser({
                    token,
                    details: UserInfo,
                    isLoggedIn: true,
                });
                localStorage.setItem('token', token);
                return;
            }
            if (typeof response === 'string') {
                toast.error(response);
            }
            Logout();
        },
        [Logout]
    );

    useEffect(() => {
        if (InitialLocalToken) {
            TokenChecker(InitialLocalToken);
            return;
        }
        Logout();
    }, [TokenChecker, Logout]);

    const Handlers = useMemo(
        () => ({
            LoginHandler: TokenChecker,
            LogoutHandler: Logout,
        }),
        [Logout, TokenChecker]
    );

    const value = { User, Handlers };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
export default AuthProvider;
