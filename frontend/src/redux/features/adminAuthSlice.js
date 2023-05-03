import { createSlice } from '@reduxjs/toolkit'
const data = localStorage.getItem('adminData') ?? '';
const parsedData = data ? JSON.parse(data) : null;
const initialState = {
    data: parsedData ?? {
        token: null,
    }
};
const adminAuthSlice = createSlice({

    name: 'Admin',
    initialState,
    reducers: {
        setAdminToken(state, action) {
            // console.log("payloadaadad",action.payload);
            localStorage.setItem(
                'adminData',
                JSON.stringify({
                    token: action.payload.token
                })
            )
            state.data = { token: action.payload.token }
            console.log("kkk", state.data)

        },
        deleteAdminToken(state) {
            console.log("jajaj",state);
            state.data = {
                token: '',
            }
            localStorage.removeItem('adminData');
        }
    }
})

export const { setAdminToken, deleteAdminToken } = adminAuthSlice.actions;

export const selectAdminAuth = (state) => state.adminauth.data

console.log();

export const adminAuthReducer = adminAuthSlice.reducer;
