import { createSlice , PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: {
        isLogged: boolean,
        email: string,
        password: string,
    }
}

const initialState = {
    value: {
        isLogged: false,
        email: '',
        password: ''
    }
} as InitialState;

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    isLogged: true
                }
            }
        },
        logout: (state) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    isLogged: false
                }
            }
        },
        setEmail: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    email: action.payload
                }
            }
        },
        setPassword: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    password: action.payload
                }
            }
        }
    }
});

export const { login, logout , setEmail , setPassword } = auth.actions;
export default auth.reducer;