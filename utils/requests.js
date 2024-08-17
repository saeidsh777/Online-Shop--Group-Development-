import { API_BASE_URL } from "./constants";

export const getAllCategory = async () => {
    const res = await fetch(`${API_BASE_URL}/categories/all`);
    const result = await res.json();

    return result
};
