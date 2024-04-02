import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getNotes = createAsyncThunk('/getAllNotes', async () => {
    try {
        const response = await axiosClient.get('/getAllNotes')

        const notesData = response.data.result.notes;

        return { notesData };

    } catch (error) {
        return Promise.reject(error)
    }
})

export const createNotes = createAsyncThunk('/createNote', async (body) => {
    try {
        const response = await axiosClient.post('/createNote', body);

        console.log('create notes response ', response);

        return response;

    } catch (error) {
        return Promise.reject(error)
    }
})

export const deleteNote = createAsyncThunk('/delete', async (_id) => {
    try {

        const response = await axiosClient.delete('/delete', { data: { _id } })

        return response

    } catch (error) {
        return Promise.reject(error)
    }
})

const notesSlice = createSlice({
    name: "notesSlice",
    initialState: {
        notesData: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, (state) => {
            state.status = 'loading'
        }).addCase(getNotes.fulfilled, (state, action) => {
            // state.notesData = action.payload.data.result.notes;
            state.notesData = action.payload.notesData;
            state.status = 'success'
        }).addCase(getNotes.rejected, (state) => {
            state.status = 'failed'
        })
    }

})

export default notesSlice.reducer;