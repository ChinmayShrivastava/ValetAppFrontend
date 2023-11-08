'use client'

import APIURL from '../../config';
import { getCSRFToken } from './getcsrf';

export const fileUploadAPI = async (file: string, type: string) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/fileupload/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({ 
            file: file,
            type: type
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
    fileUploadAPI
}