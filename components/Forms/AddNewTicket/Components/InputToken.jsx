'use client';

import getToken from '@/hooks/useToken';
import { useEffect, useState } from 'react';

const InputToken = () => {
    const [Token, setToken] = useState('');
    useEffect(() => {
        const TokenValue = getToken();
        if (TokenValue) {
            setToken(TokenValue);
        }
    }, [setToken]);
    return (
        <input
            type="text"
            name="token"
            className="hidden"
            value={Token}
            onChange={() => {
                setToken(prv => prv);
            }}
        />
    );
};
export default InputToken;
