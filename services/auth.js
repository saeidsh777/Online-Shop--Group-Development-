import { API_BASE_URL } from '@/utils/constants';

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
        return err;
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
        return err;
    }
};
