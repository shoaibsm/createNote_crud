import React, { useEffect, useRef, useState } from 'react'
import './UpdateNotes.scss'
import { useDispatch, useSelector } from 'react-redux'
import { closeUpdateModal, updateNotes } from '../../redux/slice/updateSlice'
import { getNotes } from '../../redux/slice/notesSlice'

function UpdateNotes() {

    const noteId = useSelector((state) => state.updateReducer.noteId)

    const notes = useSelector((state) => state.notesReducer.notesData)

    console.log('notes in updateNote ', notes);

    console.log('Note Id in UpdateNotes : ', noteId);

    const dispatch = useDispatch();
    const inputTitle = useRef(null)
    const inputContent = useRef(null)

    function handleEvent(e) {
        e.stopPropagation();
    }

    useEffect(() => {

        const existingNote = notes.find((note) => note._id === noteId)

        if (existingNote) {

            inputTitle.current.value = existingNote.title || '';
            inputContent.current.value = existingNote.content || '';

        }
    }, [notes, noteId])

    function handleCloseClick(e) {

        e.preventDefault()

        dispatch(closeUpdateModal(false))
    }

    const handleUpdateClick = async (e) => {
        e.preventDefault();
        const newTitle = inputTitle.current.value
        const newContent = inputContent.current.value

        try {
            await dispatch(updateNotes({
                _id: noteId,
                title: newTitle,
                content: newContent
            }));

            dispatch(closeUpdateModal(false))

            dispatch(getNotes())

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='UpdateNotes' onClick={handleEvent}>
            <form className='UpdateNotes__form'>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" className='UpdateNotes__title' ref={inputTitle} />

                <label htmlFor="desc">Description</label>
                <input type="text" name="Description" id="desc" className='UpdateNotes__desc' ref={inputContent} />

                <div className="UpdateNotes__actionBox">

                    <button className='UpdateNotes__update' onClick={handleUpdateClick}>Update</button>

                    <button className='CreateNote__btn-close' onClick={handleCloseClick}>Cancel</button>

                </div>
            </form>
        </div>
    )
}

export default UpdateNotes