import React, {useState} from 'react'
import '../styles/taskList.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormAddNewTask } from './FormAddNewTask';

export const AddNewTaskContainer = () => {
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = (data) =>{
       
        setOpenModal(true)
    }
    const handleClose = () =>{
        setOpenModal(false)
    }
  return (
    <>
        <button className='button-detalle' onClick={handleOpenModal}>Agregar Nueva tarea</button>
        <Modal
             open={openModal}
             onClose={handleClose}
             className='modal'
                       
        >
            <Box className='box-modal-style'>
                    <FormAddNewTask/>
            </Box>
        </Modal>
    </>
  )
}
