import React, { useEffect, useState } from 'react'
import './SingleNote.scss'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { openUpdateModal } from '../../redux/slice/updateSlice'
import { deleteNote, getNotes } from '../../redux/slice/notesSlice';
function SingleNote({ note }) {

    const dispatch = useDispatch();
    const [createdAtFormatted, setCreatedAtFormatted] = useState('');
    const [updatedAtFormatted, setUpdatedAtFormatted] = useState('');

    useEffect(() => {
        const formatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        try {
            const createdAtFormatted = new Intl.DateTimeFormat('en-US', formatOptions).format(new Date(note.createdAt));
            const updatedAtFormatted = new Intl.DateTimeFormat('en-US', formatOptions).format(new Date(note.updatedAt));

            setCreatedAtFormatted(`Created at : ${createdAtFormatted}`);
            setUpdatedAtFormatted(`Updated at : ${updatedAtFormatted}`);

        } catch (error) {
            console.log(error);
        }
    }, [note.createdAt, note.updatedAt]);


    async function handleDeleteClick() {
        try {
            await dispatch(deleteNote(note._id)).then(() => {

                console.log('Notes deleted');
                console.log(note._id);
            })

            dispatch(getNotes());

        } catch (error) {
            console.log(error);
        }
    }

    function handleOpenClick(e) {

        dispatch(openUpdateModal({ isOpen: true, noteId: note._id }))

    }

    return (
        <div className='SingleNote'>

            <div className="SingleNote__container">

                <h2 className="SingleNote__titleText">{note.title}</h2>
                <p className="SingleNote__desc">{note.content}</p>
                <div className="SingleNote__timeBox">

                    <p className="SingleNote__createTime">{createdAtFormatted}</p>
                    <p className="SingleNote__updatedAt">{updatedAtFormatted}</p>
                </div>
            </div>

            <div className="SingleNote__actionBox">
                <div className="SingleNote__btn-delete" onClick={handleDeleteClick}>
                    <MdDelete className='icon-delete' />
                </div>

                <div className="SingleNote__Btn-edit" onClick={handleOpenClick}>
                    <MdModeEdit className='icon-edit' />
                </div>
            </div>
        </div>
    )
}

export default SingleNote