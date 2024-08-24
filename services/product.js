import { API_BASE_URL } from '@/utils/constants';

export const addNewProduct = async formDataGenarator => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/products/create-new-product`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formDataGenarator(),
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return err;
    }
};

export const editProduct = async (formDataGenarator, productId) => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(
            `${API_BASE_URL}/products/update-product/${productId}`,
            {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: formDataGenarator(),
            }
        );
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
