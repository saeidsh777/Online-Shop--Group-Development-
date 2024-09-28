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
        console.log(err);
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
        console.log(err);
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
        return { err, ...responseAndResult };
    }
};

export const editProductModel = async (data, productModelId) => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(
            `${API_BASE_URL}/product-models/update/${productModelId}`,
            {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return { err, ...responseAndResult };
    }
};

export const getOneProduct = async productId => {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
            cache: 'no-store',
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return { err, ...responseAndResult };
    }
};

export const getAllProducts = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/products`, {
            cache: 'no-store',
        });

        const result = await res.json();
        return { res, result };
    } catch (e) {
        return e instanceof Error
            ? e.message
            : typeof e === 'string'
            ? e
            : 'Error';
    }
};

export const deleteSingleProduct = async (id, token) => {
    try {
        const res = await fetch(
            `${API_BASE_URL}/products/delete-product/${id}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        const result = await res.json();
        return { res, result };
    } catch (e) {
        return 'error';
    }
};

export const deleteSingleModel = async (id, token) => {
    try {
        const res = await fetch(`${API_BASE_URL}/product-models/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();
        return { res, result };
    } catch (e) {
        return e instanceof Error
            ? e.message
            : typeof e === 'string'
            ? e
            : 'Error';
    }
};
