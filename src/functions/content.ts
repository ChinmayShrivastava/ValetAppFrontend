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

export const submitNoteAPI = async (docId: string | string[], text: string, topics: string, doctitle: string, doctype: string, url: string, title: string) => {
    console.log(docId, text, topics, doctitle, doctype, url);
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/create_note/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
            document: docId,
            text: text,
            topics: topics,
            doctitle: doctitle,
            doctype: doctype,
            url: url,
            title: title
        })
    });
    if (response.status === 200) {
        const data = await response.json();
        return [true, data];
    }
    else {
        return [false, null];
    }
}

export const deleteDocAPI = async (docId: string | string[]) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/delete_document/`, {
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
        const data = await response;
        return true;
    }
    else {
        return false;
    }
}

export const askvectorquestionAPI = async (question: string) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/answer_vector/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
            question: question
        })
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}

export const askgraphquestionAPI = async (question: string) => {
    const csrftoken = await getCSRFToken();
    const response = await fetch(`${APIURL}/answer_graph/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
            question: question
        })
    });
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}

export default {
    getUserDocsAPI,
    getDocContentAPI,
    submitNoteAPI,
    deleteDocAPI,
    askvectorquestionAPI,
    askgraphquestionAPI
}