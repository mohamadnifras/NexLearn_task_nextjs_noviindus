import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice"
import examReducer from "@/features/exam/examSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        exam: examReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch