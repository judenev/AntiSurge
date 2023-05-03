import { createSlice } from '@reduxjs/toolkit'
const data = localStorage.getItem('empData') ?? '';
const parsedData = data ? JSON.parse(data) : null;
const initialState = {
    data: parsedData ?? {
        token: null,
    }
};
const empAuthSlice = createSlice({

    name: 'Employee',
    initialState,
    reducers: {
        setEmployeeToken(state, action) {
   
            localStorage.setItem(
                'empData',
                JSON.stringify({
                    token: action.payload
                })
            )
            state.data = { token: action.payload }
            console.log("kkk",   JSON.stringify({
                token: action.payload
            }))

        },
        deleteEmployeeToken(state) {
          
            localStorage.removeItem('empData');
            state.data.token = {
                token: null,
            }
        }
    }
})

export const { setEmployeeToken, deleteEmployeeToken } = empAuthSlice.actions;
export const selectEmpAuth = (state) => state.empauth.data
export const employeeAuthReducer = empAuthSlice.reducer;
