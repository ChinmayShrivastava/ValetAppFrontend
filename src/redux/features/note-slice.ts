import { createSlice , PayloadAction , createAsyncThunk } from '@reduxjs/toolkit';
import { submitNoteAPI } from '@/functions/content';

type InitialState = {
    value: NoteState
}

type NoteState = {
    type: string,
    docid: string,
    doctitle: string,
    title: string,
    url: string,
    content: string,
    topics: string,
}

const initialState = {
    value: {
        type: 'Article',
        docid: '',
        doctitle: '',
        url: '',
        title: '',
        content: '',
        topics: ''
    } as NoteState
} as InitialState;

export const note = createSlice({
    name: 'note',
    initialState,
    reducers: {
        resetNote: () => {
            return initialState;
        },
        setType: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    type: action.payload
                }
            }
        },
        setDocId: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    docid: action.payload
                }
            }
        },
        setTitle: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    title: action.payload
                }
            }
        },
        setDocTitle: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    doctitle: action.payload
                }
            }
        },
        setUrl: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    url: action.payload
                }
            }
        },
        setContent: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    content: action.payload
                }
            }
        },
        setTopics: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    topics: action.payload
                }
            }
        },
        submitNote: (state, action) => {
            // if content is empty, return
            if (state.value.content === '' && state.value.title === '') {
                alert('Please enter content or title');
                return;
            }
            return {
                ...state,
                value: {
                    ...state.value,
                    content: '',
                    title: '',
                }
            }
        }
    }
});

export const { resetNote, setType, setTitle, setUrl, setContent, setTopics, submitNote , setDocId , setDocTitle } = note.actions;
export default note.reducer;