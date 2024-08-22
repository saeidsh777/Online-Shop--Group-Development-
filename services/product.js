import { API_BASE_URL } from '@/utils/constants';

export const addNewProduct = async formData => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/products/create-new-product`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return err;
    }
};

export const getOneProduct = async productId => {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`);
    const result = await res.json();

    return { res, result };
};
