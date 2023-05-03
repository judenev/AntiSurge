import { configureStore } from "@reduxjs/toolkit";
import { adminAuthReducer } from "../features/adminAuthSlice";
import { userAuthReducer } from "../features/userAuthSlice";
import { employeeAuthReducer } from "../features/employeeAuthSlice";

const store = configureStore({
    reducer:{
        adminauth:adminAuthReducer,
        userauth:userAuthReducer,
        empauth: employeeAuthReducer,
    }
})
export default store