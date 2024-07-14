import React, {useState, useEffect} from 'react'
import { useTaskModalContex, useTakModalChangeContext } from '../TaskModalProvider';
import '../styles/taskList.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { TaskForm } from './TaskForm';
import { EliminatedTask } from './EliminatedTask';
import { FormAddNewTask } from './FormAddNewTask';




export const TaskList = () => {

    const [toDoList, setToDoList] = useState([])
    const [listData, setListData] = useState([])
    const [idButton, setIdButton] = useState(null)

    const openModal = useTaskModalContex()
    const handleOpenModal =  useTakModalChangeContext()
    const handleClick = (e, data) =>{

        console.log('evento del boton', e.target)
        const id = e.target.id
        if(id !== '3'){
            setListData(data)
        }
        setIdButton(id)
        handleOpenModal()
    }

    useEffect(()=>{
        fetch('http://localhost:3001/task/list')
        .then((response)=> response.json())
        .then((json)=> setToDoList(json))
    }, [toDoList])
  return (
    <div>
        <button id='3' className='button-detalle' onClick={(e) => handleClick(e)}>Nueva Tarea</button>
        {
            
            toDoList.map((list, i)=>{
                return(

                    <>  
                        <div className='box-list'>
                            <span className='title-task'>{list.taskName} </span>
                            <button id='1' className='button-detalle' onClick={(e) => handleClick(e, list)}>Ver Detalle</button>
                            <button id='2' className='button-detalle' onClick={(e) => handleClick(e, list)}>Eliminar</button>
                        </div>
                      
                    
                    </>          
                
                )
            })
        }
        <Modal
             open={openModal}
             onClose={handleOpenModal}
             className='modal'
                        
        >
            <Box className='box-modal-style'>
                    {
                        idButton === '1' ?
                        <TaskForm list={listData}/>
                        :
                        idButton === '2' ?<EliminatedTask list={listData}/> : <FormAddNewTask/>
                    }
            </Box>
        </Modal>
    </div>    
  )
}
