import React, {useState, useEffect} from 'react'
import { useTaskModalContex } from '../TaskModalProvider';
import '../styles/taskList.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { TaskForm } from './TaskForm';
import { set } from 'react-hook-form';



export const TaskList = () => {

    const [toDoList, setToDoList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [listData, setListData] = useState([])
    const [idButton, setIdButton] = useState(null)
    const handleOpenModal = (data, e) =>{
       console.log('evento del boton', e.target.id)
       const id = e.target.id
       setIdButton(id)
        setListData(data)
        setOpenModal(true)
    }
    const handleClose = () =>{
        setOpenModal(false)
    }

    useEffect(()=>{
        fetch('http://localhost:3001/task/list')
        .then((response)=> response.json())
        .then((json)=> setToDoList(json))
    }, [toDoList])
  return (
    <div>
    {
        toDoList.map((list, i)=>{
            return(

                <>  
                    <div className='box-list'>
                        <span className='title-task'>{list.taskName} </span>
                        <button id='1' className='button-detalle' onClick={(e) => handleOpenModal(list, e)}>Ver Detalle</button>
                        <button id='2' className='button-detalle' onClick={(e) => handleOpenModal(list.id, e)}>Eliminar</button>
                    </div>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        className='modal'
                       
                    >
                        <Box className='box-modal-style'>
                            {
                                idButton === '1' ?
                                <TaskForm list={listData}/>
                                :
                                <h1>Eliminar producto</h1>
                            }
                        </Box>
                    </Modal>
                  
                </>          
            
            )
        })
    }
</div>    
  )
}
