import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../utils/axiosClient';

export const updateNotes = createAsyncThunk('/updateNotes', async (body) => {
    try {
        const response = await axiosClient.put('/update', body)

        return response.data.result.updatedNote;

    } catch (error) {
        throw error
    }

})

const updateSlice = createSlice({
    name: 'updateSlice',
    initialState: {
        isUpdateModalOpen: false,
        noteId: null,
    },
    reducers: {
        openUpdateModal: (state, action) => {
            state.isUpdateModalOpen = action.payload;
            state.noteId = action.payload.noteId

        },
        closeUpdateModal: (state, action) => {
            state.isUpdateModalOpen = action.payload
        }
    }
});

export default updateSlice.reducer;

export const { openUpdateModal, closeUpdateModal } = updateSlice.actions;
