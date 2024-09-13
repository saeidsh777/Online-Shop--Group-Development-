import { API_BASE_URL, responseAndResult } from '@/utils/constants';


export const getAllBrands = async () => {
  
    try {
      const res = await fetch(`${API_BASE_URL}/brands/all`, {
        cache: 'no-store',
      });
  
      const result = await res.json();
  
      return { res, result };
    } catch (err) {
      return { err, ...responseAndResult };
    }
  };
  


export const getSingleBrand = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
            cache: 'no-store',
        });
        const result = await response.json();

        return { result, response };
    } catch (e) {
        return e instanceof Error ? e.message : 'Error';
    }
};


export const getBrandByTitle = async (title) => {
    try {
        const response = await fetch(`${API_BASE_URL}/brands/title/${title}`, {
            cache: 'no-store',
        });
        const result = await response.json();

        return { result, response };
    } catch (e) {
        return e instanceof Error ? e.message : 'Error';
    }
};


export const addBrand = async (Data, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/brands/create`, {
            method: 'POST',
            body: JSON.stringify(Data),
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


export const updateBrand = async (Data, id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/brands/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(Data),
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


export const deleteBrand = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/brands/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (e) {
        return e instanceof Error ? e.message : 'Error';
    }
};
