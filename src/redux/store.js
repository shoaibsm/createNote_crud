import { configureStore } from '@reduxjs/toolkit'
import updateReducer from './slice/updateSlice'
import notesReducer from './slice/notesSlice'

export default configureStore({
    reducer: {
        updateReducer,
        notesReducer,
    }
})