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

const InitialValue = {
    isLoggedIn: false,
    token: '',
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
    const [isChecked, setChecked] = useState(false);
    const reValidateTokenInterval = useRef(null);

    const ClearReValidator = useCallback(() => {
        if (!reValidateTokenInterval.current) return;

        clearInterval(reValidateTokenInterval.current);
        reValidateTokenInterval.current = null;
    }, []);

    const Logout = useCallback(() => {
        localStorage.setItem('token', '');
        setUser(InitialValue);
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
        const InitialLocalToken = localStorage.getItem('token');
        if (InitialLocalToken) {
            const checkInitialLocalToken = async () => {
                await TokenChecker(InitialLocalToken);
                setChecked(true);
            };
            checkInitialLocalToken();
            return;
        }
        setChecked(true);
    }, [TokenChecker]);

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

    if (!isChecked) {
        return <div className="text-center font-bold">LOADING...</div>;
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
export default AuthProvider;
