import React, { useEffect } from 'react'
import './Notes.scss'
import CreateNote from '../components/createNote/CreateNote'
import SingleNote from '../components/singleNote/SingleNote'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../redux/slice/notesSlice'

function Notes() {

    const distpatch = useDispatch()

    const notes = useSelector((state) => state.notesReducer.notesData)

    const reverseNotes = [...notes].reverse();

    useEffect(() => {
        distpatch(getNotes())
    }, [])

    return (
        <div className='Notes'>
            <div className="Notes__createNote">
                <CreateNote />
            </div>

            <div className="Notes__singleNote">

                {reverseNotes.map((singleNote) => (
                    <SingleNote key={singleNote._id} note={singleNote} />
                ))}

            </div>

        </div>
    )
}

export default Notes