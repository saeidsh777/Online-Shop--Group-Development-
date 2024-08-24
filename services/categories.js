import { API_BASE_URL } from '@/utils/constants';

export const getAllCategory = async () => {
    const res = await fetch(`${API_BASE_URL}/categories/all`);
    const result = await res.json();

    return { res, result };
};

export const addCategory = async (title, Token) => {
    const response = await fetch(API_BASE_URL + '/categories/create', {
        method: 'POST',
        body: { title },
        headers: {
            authorization: `Bearer ${Token}`,
        },
    });

    return response;
};
