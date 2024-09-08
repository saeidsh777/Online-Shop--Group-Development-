import { API_BASE_URL } from '@/utils/constants';

export const addTicket = async (message, token) => {
    try {
        const response = await fetch(API_BASE_URL + '/tickets/create-ticket', {
            method: 'POST',
            body: JSON.stringify({ message }),
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

export const getMyTickets = async token => {
    try {
        const response = await fetch(API_BASE_URL + '/tickets/my-tickets', {
            method: 'GET',
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
