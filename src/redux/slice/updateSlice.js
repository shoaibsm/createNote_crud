import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../utils/axiosClient';

export const updateNotes = createAsyncThunk('/updateNotes', async (body) => {

    const response = await axiosClient.put('/update', body)

    console.log('updated notes response is : ', response);

    return response;

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
