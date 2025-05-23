import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",   
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload
        },
        updateUser(state, value) {
            state.user = { ...state.user, ...value.payload}
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
    }
})

export const {setUser, updateUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer
