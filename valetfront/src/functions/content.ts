'use client'

import APIURL from '../../config';
import { getCSRFToken } from './getcsrf';

export const getUserDocsAPI = async () => {
    const response = await fetch(`${APIURL}/get_user_documents/`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}

export const getDocContentAPI = async (docId: string | string[]) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/get_document_notes/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ 
            document: docId
         })
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}

export default {
    getUserDocsAPI,
    getDocContentAPI
}