import { API_BASE_URL } from '@/utils/constants';

export const getUserByEmail = async userEmail => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(
            `${API_BASE_URL}/users/get-user-by-email/${userEmail}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return err;
    }
};

export const getUserByPhoneNumber = async phoneNumber => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(
            `${API_BASE_URL}/users/get-user-by-phone-number/${phoneNumber}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return err;
    }
};

export const getUserInfo = async token => {
    try {
        const res = await fetch(`${API_BASE_URL}/users/me/`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        return err instanceof Error ? err.message : 'Error';
    }
};
