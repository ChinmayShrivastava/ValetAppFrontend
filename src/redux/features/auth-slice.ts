import { createSlice , PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: {
        isLogged: boolean,
        email: string,
        password: string,
        confirmpassword: string,
        firstName: string,
        lastName: string,
        isRegistered: boolean,
        loginloading: boolean,
        registerloading: boolean,
    }
}

const initialState = {
    value: {
        isLogged: false,
        email: '',
        password: '',
        confirmpassword: '',
        firstName: '',
        lastName: '',
        isRegistered: false,
        loginloading: false,
        registerloading: false,
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
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    confirmpassword: action.payload
                }
            }
        },
        setFirstName: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    firstName: action.payload
                }
            }
        },
        setLastName: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    lastName: action.payload
                }
            }
        },
        register: (state) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    isRegistered: true
                }
            }
        },
        loginloading: (state) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    loginloading: true
                }
            }
        },
        loginloadingoff: (state) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    loginloading: false
                }
            }
        },
        registerloading: (state) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    registerloading: true
                }
            }
        },
        registerloadingoff: (state) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    registerloading: false
                }
            }
        },
    }
});

export const { login, logout , setEmail , setPassword , setConfirmPassword , setFirstName , setLastName , register , registerloading , loginloading , registerloadingoff , loginloadingoff } = auth.actions;
export default auth.reducer;