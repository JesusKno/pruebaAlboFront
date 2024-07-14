import React  from 'react'
import { useTaskModalContex, useTakModalChangeContext } from '../TaskModalProvider';
import '../styles/taskList.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormAddNewTask } from './FormAddNewTask';

export const AddNewTaskContainer = () => {

  const openModal = useTaskModalContex()

  const handleOpenModal =  useTakModalChangeContext()

  return (
    <>
        <button className='button-detalle' onClick={handleOpenModal}>Agregar Nueva tarea</button>
        <Modal
             open={openModal}
             onClose={handleOpenModal}
             className='modal'
                       
        >
            <Box className='box-modal-style'>
                    <FormAddNewTask/>
            </Box>
        </Modal>
    </>
  )
}
