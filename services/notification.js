import { API_BASE_URL, responseAndResult } from '@/utils/constants';

export const sendNotification = async data => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/notifications/create`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        console.log(err);
        return { err, ...responseAndResult };
    }
};

export const deleteNotification = async nofitId => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(
            `${API_BASE_URL}/notifications/delete/${nofitId}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        const result = await res.json();

        return { res, result };
    } catch (err) {
        console.log(err);
        return { err, ...responseAndResult };
    }
};

export const getAllNotifications = async token => {
    try {
        const res = await fetch(`${API_BASE_URL}/notifications/notifications`, {
            cache: 'no-store',
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const result = await res.json();

        return { res, result };
    } catch (err) {
        console.log(err);
        return { err, ...responseAndResult };
    }
};
