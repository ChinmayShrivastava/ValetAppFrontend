import { createSlice , PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: NoteState
}

type NoteState = {
    type: string,
    title: string,
    url: string,
    content: string,
    topics: string,
}

const initialState = {
    value: {
        type: 'Article',
        title: '',
        url: '',
        content: '',
        topics: '',
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
        setTitle: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    title: action.payload
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
        submitNote: () => {
            // TODO: submit note to backend
            return initialState;
        }
    }
});

export const { resetNote, setType, setTitle, setUrl, setContent, setTopics, submitNote } = note.actions;
export default note.reducer;