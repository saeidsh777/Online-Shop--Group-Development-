import { API_BASE_URL, responseAndResult } from '@/utils/constants';

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
        return { err, ...responseAndResult };
    }
};

export const addNewProductModel = async formatDataModel => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/product-models/create`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(formatDataModel),
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return { err, ...responseAndResult };
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

export const getAllProducts = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const result = await res.json();

        return { res, result };
    } catch (e) {
        return 'error';
    }
};
