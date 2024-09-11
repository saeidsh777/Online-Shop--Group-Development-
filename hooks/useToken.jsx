'use client';

import { AuthContext } from '@/contexts/AuthProvider';
import { useContext, useMemo } from 'react';
import toast from 'react-hot-toast';

const useToken = () => {
    const {
        User: { token },
    } = useContext(AuthContext);

    const Token = useMemo(() => token, [token]);

    if (!Token) {
        toast.error('Token not found please login/register first');
        return false;
    }

    return Token;
};
export default useToken;
