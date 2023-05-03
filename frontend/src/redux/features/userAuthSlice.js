import {createSlice} from '@reduxjs/toolkit'
const data=localStorage.getItem('userData') ?? '';
const parsedData =data ? JSON.parse(data):null;
const initialState ={
    data:parsedData??{
        token:null,
    }
}

const userAuthSlice =createSlice({
    name:'User',
    initialState,
    
    reducers:{
        
        setUserToken(state,action){
            console.log("userauthdeatails",action.payload);
            localStorage.setItem(
                'userData',
                JSON.stringify({
                    token:action.payload,
                    
                })
            )
            state.data = {token:action.payload}
        },
        deleteUserToken(state){
            state.data ={
                token: null,
            }
            localStorage.removeItem('userData');
        }
    }
})

export  const{setUserToken,deleteUserToken} = userAuthSlice.actions;
export const selectUserAuth = (state) => state.userauth.data
export  const userAuthReducer =userAuthSlice.reducer