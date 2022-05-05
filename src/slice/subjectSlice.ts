import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { Subject } from '../models/subject'

export interface SubjectState {
    subjectList: Subject[]
}
const initialState: SubjectState = {
    subjectList: []
}

const subjectSlice = createSlice({
    name: "subjects",
    initialState,
    reducers: {
        loadSubjectList: (state, action: PayloadAction<Subject[]>) => {
            state.subjectList = action.payload
        },
        createSubject: (state, action: PayloadAction<Subject>) => {
            state.subjectList.push(action.payload)
        },
        deleteSubject: (state, action: PayloadAction<number>) => {
            const index = state.subjectList.findIndex(item => item.id == action.payload)
            if (index > -1) {
                state.subjectList.splice(index, 1);
            }
        }

    }
})

export const { createSubject, deleteSubject, loadSubjectList } = subjectSlice.actions;

export default subjectSlice.reducer