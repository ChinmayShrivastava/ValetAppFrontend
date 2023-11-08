import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './features/note-slice';
import documentsReducer from './features/documents-slice';
import notesReducer from './features/notes-slice';
import authReducer from './features/auth-slice';
import fileReducer from './features/file-upload-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        // add reducers here
        noteReducer,
        notesReducer,
        documentsReducer,
        authReducer,
        fileReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;