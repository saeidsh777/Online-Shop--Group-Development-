import { API_BASE_URL } from '@/utils/constants';

export const getAllCategory = async () => {
    const res = await fetch(`${API_BASE_URL}/categories/all`);
    const result = await res.json();

    return { res, result };
};

export const addCategory = async (title, token) => {
    try {
        const response = await fetch(API_BASE_URL + '/categories/create', {
            method: 'POST',
            body: JSON.stringify({ title }),
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });

        return response;
    } catch (e) {
        return e instanceof Error
            ? typeof e.message === 'string'
                ? e.message
                : 'Error'
            : 'Error';
    }
};
