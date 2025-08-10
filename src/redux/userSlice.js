import { createSlice } from "@reduxjs/toolkit";

import { jwtDecode } from "jwt-decode";
const token=localStorage.getItem('user')
let User=null
if(token){
    User=jwtDecode(token)
    console.log(User);
    
}
const initial_State={
    user:User|| {}
};
const userSlice=createSlice({
    name:'user',
    initialState:initial_State,
    reducers:{
        setUserData:(state,action)=>{
            state.user=action.payload;
        },
        clearUserData:(state)=>{
            state.user={},
            localStorage.removeItem('user')
        }
    }
})
export const {setUserData,clearUserData}=userSlice.actions
export  default userSlice.reducer;