'use client'

import APIURL from '../../config';
import { getCSRFToken } from './getcsrf';

export const notesUploadAPI = async (notes: string) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/notesupload/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({ 
            notes: notes
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
    notesUploadAPI
}