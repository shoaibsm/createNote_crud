import React, { useEffect } from 'react'
import './Notes.scss'
// import CreateNote from '../components/createNote/CreateNote'
import SingleNote from '../components/singleNote/SingleNote'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../redux/slice/notesSlice'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { MdError } from "react-icons/md";

function Notes() {

    const distpatch = useDispatch()

    const notes = useSelector((state) => state.notesReducer.notesData)
    const status = useSelector((state) => state.notesReducer.status)

    const reverseNotes = [...notes].reverse();

    useEffect(() => {
        distpatch(getNotes())
    }, [distpatch])

    if (status === 'loading') {

        return <div className='loading'><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div>
    }

    if (status === 'failed') {
        return <div className='errorMsg'>
            <MdError className='icon' />
            <p>Something went wrong...!</p>
        </div>
    }

    return (
        <div className='Notes'>
            {/* <div className="Notes__createNote">
                <CreateNote />
            </div> */}

            <div className="Notes__singleNote">

                {reverseNotes.map((singleNote) => (
                    <SingleNote key={singleNote._id} note={singleNote} />
                ))}
            </div>
        </div>
    )
}

export default Notes