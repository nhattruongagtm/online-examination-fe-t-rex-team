import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseData } from "../models/responseData";

interface ResponseSlice {
    response: ResponseData
}
const initialState: ResponseSlice = {
    response: {
        message: '',
        status: '',
        object: ''
    }
}
const responseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        loadMessage: (state, action: PayloadAction<ResponseData>) => {
            state.response = action.payload
        }
    }
})
export const { loadMessage } = responseSlice.actions

export default responseSlice.reducer