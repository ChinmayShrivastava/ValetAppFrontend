import APIURL from '../../config';
import { getCSRFToken } from './getcsrf';

export const checkAuthAPI = async () => {
    const response = await fetch(`${APIURL}/check_login`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    });
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export const loginAPI = async (email: string, password: string) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        mode: 'cors'
    });
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export const logoutAPI = async () => {
    const response = await fetch(`${APIURL}/logout/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    });
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export default {
    checkAuthAPI,
    loginAPI,
    logoutAPI
}