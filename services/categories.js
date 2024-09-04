import { API_BASE_URL, responseAndResult } from '@/utils/constants';

export const getAllCategories = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/categories/all`, {
            cache: 'no-store',
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return { err, ...responseAndResult };
    }
};

export const getSingleCategory = async id => {
    try {
        const response = await fetch(API_BASE_URL + '/categories/' + id);
        if (response.ok) {
            const result = await response.json();
            return result;
        }

        return 'Error';
    } catch (e) {
        return e instanceof Error ? e.message : 'Error';
    }
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
        return e instanceof Error ? e.message : 'Error';
    }
};

export const deleteCategory = async (id, token) => {
    try {
        const response = await fetch(
            API_BASE_URL + '/categories/delete/' + id,
            {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (e) {
        return e instanceof Error ? e.message : 'Error';
    }
};

export const updateCategory = async (Data, id, token) => {
    try {
        const response = await fetch(
            API_BASE_URL + '/categories/update/' + id,
            {
                method: 'PUT',
                body: JSON.stringify(Data),
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            }
        );

        return response;
    } catch (e) {
        return e instanceof Error ? e.message : 'Error';
    }
};
