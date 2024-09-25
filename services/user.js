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

export const getUserInfo = async (token) => {
    
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


export const updateUserInfo = async (updatedUser ) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const res = await fetch(`${API_BASE_URL}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Error updating user info');

        return { res, result };
    } catch (err) {
        return err instanceof Error ? err.message : 'Error updating user info';
    }
};






export const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Error updating password');

        return { res, result };
    } catch (err) {
        return err instanceof Error ? err.message : 'Error updating password';
    }
};
