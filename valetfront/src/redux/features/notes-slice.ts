import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";

type InitialState = {
    value: Notes
}

type Notes = {
    documentid: string,
    title: string,
    type: string,
    url: string,
    totalnotes: number,
    topics: string,
    notes: NoteState[]
}

type NoteState = {
    id: string,
    content: string,
    topics: string
}

const initialState = {
    value: {
        documentid: '',
        title: '',
        type: '',
        url: '',
        totalnotes: 0,
        topics: '',
        notes: []
    } as Notes
} as InitialState;

export const notes = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        resetNotes: () => {
            return initialState;
        },
        setNotes: () => {
            // TODO: call API to get notes
            return initialState; // For now, just return the initial state
        },
        addNote: (state, action: PayloadAction<NoteState>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    notes: [
                        ...state.value.notes,
                        action.payload
                    ]
                }
            }
        },
        removeNoteById: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    notes: state.value.notes.filter(note => note.id !== action.payload)
                }
            }
        },
        updateNoteById: (state, action: PayloadAction<NoteState>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    notes: state.value.notes.map(note => {
                        if (note.id === action.payload.id) {
                            return action.payload;
                        }
                        return note;
                    })
                }
            }
        }
    }
});

export const { resetNotes, setNotes, addNote, removeNoteById, updateNoteById } = notes.actions;
export default notes.reducer;