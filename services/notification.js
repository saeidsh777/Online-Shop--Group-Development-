import { API_BASE_URL, responseAndResult } from '@/utils/constants';

export const sendNotificationToAll = async data => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/notifications/create`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
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
