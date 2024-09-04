'use client';

import toast from 'react-hot-toast';

const useToken = () => {
    const Token = localStorage.getItem('token');

    if (!Token) {
        toast.error('Token not found please login/register first');
        return false;
    }

    return Token;
};
export default useToken;
