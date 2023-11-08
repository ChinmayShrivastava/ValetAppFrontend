import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";

type InitialState = {
    value: File
}

type File = {
    type: string,
    file: string,
    isUploading: boolean,
}

const initialState = {
    value: {
        type: '',
        file: '',
        isUploading: false,
    } as File
} as InitialState;

export const file = createSlice({
    name: 'file',
    initialState,
    reducers: {
        uploadfile: (state, action: PayloadAction<File>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    file: action.payload
                }
            }
        },
        setType: (state, action: PayloadAction<File>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    type: action.payload
                }
            }
        },
        setUploading: (state, action: PayloadAction<File>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    isUploading: true
                }
            }
        },
        setUploaded: (state, action: PayloadAction<File>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    isUploading: false
                }
            }
        },
    }
});

export const { uploadfile, setType, setUploading, setUploaded } = file.actions;
export default file.reducer;