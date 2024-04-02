import { useEffect, useState } from 'react';
import './App.css';
import UpdateNotes from './components/updateNotes/UpdateNotes';
import Notes from './pages/Notes';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from './redux/slice/notesSlice';

function App() {

	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const distpatch = useDispatch();

	const openUpdateModal = useSelector((state) => state.updateReducer.isUpdateModalOpen)

	useEffect(() => {

		setUpdateModalOpen(openUpdateModal)

	}, [openUpdateModal,])

	useEffect(() => {
		distpatch(getNotes())
	}, [])


	return (
		<div className="App">

			<Notes />

			{isUpdateModalOpen && <UpdateNotes />}
		</div>
	);
}

export default App;
