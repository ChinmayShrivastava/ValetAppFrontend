import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";

type InitialState = {
    value: Documents
}

type Documents = {
    documents: DocumentState[]
}

type DocumentState = {
    id: string,
    type?: string,
    name: string,
    url?: string,
    subdocs?: number,
    dateadded?: string,
    datemodified?: string,
    totalnotes?: number,
}

const initialState = {
    value: {
        documents: []
    } as Documents
} as InitialState;

export const documents = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        resetDocuments: () => {
            return initialState;
        },
        setDocuments: (state, action: PayloadAction<Documents>) => {
            // action.payload is of the type list of DocumentState [{}, {}, {}]
            return {
                ...state,
                value: {
                    ...state.value,
                    documents: action.payload.documents
                }
            }
        },
        addDocument: (state, action: PayloadAction<DocumentState>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    documents: [...state.value.documents, action.payload]
                }
            }
        },
        removeDocumentById: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    documents: state.value.documents.filter(doc => doc.id !== action.payload)
                }
            }
        },
        updateDocumentById: (state, action: PayloadAction<DocumentState>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    documents: state.value.documents.map(doc => {
                        if (doc.id === action.payload.id) {
                            return action.payload;
                        }
                        return doc;
                    })
                }
            }
        } 
    }
});

export const { resetDocuments, setDocuments, addDocument, removeDocumentById, updateDocumentById } = documents.actions;
export default documents.reducer;