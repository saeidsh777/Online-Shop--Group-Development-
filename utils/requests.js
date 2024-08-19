import { API_BASE_URL } from './constants';

//* Request For Categories ( START )
export const getAllCategory = async () => {
    const res = await fetch(`${API_BASE_URL}/categories/all`);
    const result = await res.json();

    return result;
};
// Request For Categories ( END )

//* Request For Products ( START )
export const addNewProduct = async formData => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/products/create-new-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const result = await res.json();

        return result;
    } catch (err) {
        return err;
    }
};

export const getOneProduct = async productId => {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`);
    const result = await res.json();

    return result;
};
// Request For Products ( END )
