import React, {useState, useEffect} from 'react'
import '../styles/taskList.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { TaskForm } from './TaskForm';



export const TaskList = () => {

    const [toDoList, setToDoList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [listData, setListData] = useState([])
    const handleOpenModal = (data) =>{
       
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
    }, [])
  return (
    <div>
    {
        toDoList.map((list, i)=>{
            return(

                <>  
                    <div className='box-list'>
                        <span className='title-task'>{list.taskName} </span>
                        <button className='button-detalle' onClick={(e) => handleOpenModal(list)}>Ver Detalle</button>
                    </div>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        className='modal'
                       
                    >
                        <Box className='box-modal-style'>
                            <TaskForm list={listData}/>
                        </Box>
                    </Modal>
                  
                </>          
            
            )
        })
    }
</div>    
  )
}
