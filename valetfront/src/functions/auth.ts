'use client'

import APIURL from '../../config';
import { getCSRFToken } from './getcsrf';

export const checkAuthAPI = async () => {
    const response = await fetch(`${APIURL}/check_login`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            // 'access-control-allow-origin': 'http://127.0.0.1:3000'
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
            'X-CSRFToken': csrftoken,
            // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({ 
            email: email,
            password: password
         }),
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
    const response = await fetch(`${APIURL}/logout`, {
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

export const registerAPI = async (email: string, password: string, firstName: string, lastName: string) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({ 
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
         }),
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
    logoutAPI,
    registerAPI
}