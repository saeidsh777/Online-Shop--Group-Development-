'use client';

import { getUserInfo } from '@/services/user';
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

const InitialLocalToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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
    const reValidateTokenInterval = useRef(null);

    const ClearReValidator = useCallback(() => {
        if (!reValidateTokenInterval.current) return;

        clearInterval(reValidateTokenInterval.current);
        reValidateTokenInterval.current = null;
    }, []);

    const Logout = useCallback(() => {
        localStorage.setItem('token', '');
        setUser({ ...InitialValue, token: '' });
        ClearReValidator();
    }, [setUser, ClearReValidator]);

    const TokenChecker = useCallback(
        async token => {
            if (!token) return;

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

    // validate InitialLocalToken on first component mount if existed
    // (the token that previously stored in localsotrage)
    useEffect(() => {
        InitialLocalToken ? TokenChecker(InitialLocalToken) : Logout();
    }, [Logout, TokenChecker]);

    // auto revalidate token for every 10min
    // (the token that has been stored in User state at the top)
    // OR
    // remove revalidation on component unMount and only if (!User.token)
    useEffect(() => {
        const _10min = 600_000;
        if (!User.token && reValidateTokenInterval.current) {
            ClearReValidator();
        } else {
            reValidateTokenInterval.current = setInterval(
                TokenChecker,
                _10min,
                User.token
            );
        }

        return ClearReValidator;
    }, [TokenChecker, User.token, ClearReValidator]);

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
