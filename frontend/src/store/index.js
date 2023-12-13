import { createSlice, configureStore }  from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        isLoggedIn: false,
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");
            state.isLoggedIn = false;
        },
    }
});

const adminSlice = createSlice({
    name: 'auth',
    initialState: { 
        isLoggedIn: false,
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("adminId");
            localStorage.removeItem("adminToken");
            state.isLoggedIn = false;
        },
    }
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
    reducer: { 
        user: userSlice.reducer, 
        admin: adminSlice.reducer 
    }
});