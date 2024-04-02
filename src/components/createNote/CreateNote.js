import React, { useEffect, useRef, useState } from 'react'
import './CreateNote.scss'
import { useDispatch } from 'react-redux'
import { createNotes, getNotes } from '../../redux/slice/notesSlice'

function CreateNote() {

    const titleInput = useRef(null)
    const contentInput = useRef(null)

    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault();
        const newTitle = titleInput.current.value;
        const newContent = contentInput.current.value

        try {
            // Dispatch createNotes and wait for the promise to resolve
            await dispatch(createNotes({
                title: newTitle,
                content: newContent,
            }));

            dispatch(getNotes());

            console.log('notes created now ');

        } catch (error) {
            console.error('Error creating note:', error);
        }

    }

    return (
        <div className='CreateNote'>
            <form>
                <label htmlFor="title">Title</label>

                <input type="text" name="title" id="title" className='CreateNote__title' ref={titleInput} />

                <label htmlFor="desc">Description</label>
                <input type="text" name="Description" id="desc" className='CreateNote__desc' ref={contentInput} />

                <button className='CreateNote__submit' onClick={handleSubmit}>Submit</button>

            </form>
        </div>
    )
}

export default CreateNote