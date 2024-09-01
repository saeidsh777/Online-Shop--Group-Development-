import { API_BASE_URL } from '@/utils/constants';

export const getAllCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/categories/all`);
    const result = await res.json();

    return { res, result };
};

export const addCategory = async (Data, token) => {
    try {
        const response = await fetch(API_BASE_URL + '/categories/create', {
            method: 'POST',
            body: JSON.stringify(Data),
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
