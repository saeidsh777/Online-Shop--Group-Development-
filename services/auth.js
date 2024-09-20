import { API_BASE_URL, responseAndResult } from '@/utils/constants';

export const login = async data => {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return { err, ...responseAndResult };
    }
};

export const registerAuth = async data => {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return { err, ...responseAndResult };
    }
};

export const resetPassword = async data => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return { err, ...responseAndResult };
    }
};
