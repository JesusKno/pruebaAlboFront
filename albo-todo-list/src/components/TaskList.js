import React, {useState, useEffect} from 'react'
import { useTaskModalContex, useTakModalChangeContext } from '../TaskModalProvider';
import '../styles/taskList.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { TaskForm } from './TaskForm';
import { EliminatedTask } from './EliminatedTask';
import { FormAddNewTask } from './FormAddNewTask';




export const TaskList = () => {

    const [toDoList, setToDoList] = useState([])
    const [listData, setListData] = useState([])
    const [idButton, setIdButton] = useState(null)
    const [open, setOpen] = useState(false)

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
    const handleClickCompleteTask = (list) =>{

        const id = list._id
        console.log('revisa el id desde actualiazar estatus', id)
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
        };
        try {
            fetch(`http://localhost:3001/update/task/status/${id}`, requestOptions)
            .then(response => response.json())
            .catch(error => console.error('Error', error))
            .then(result => console.log(result))
            
           
        } catch (error) {
        console.log('Error', error);
        }finally{
            setOpen(true)
            setTimeout(()=>{
               setOpen(false)
            }, 4000)
           
        }

    }

    useEffect(()=>{
       const getListTask = async()=>{
            try {
                const res = await fetch('http://localhost:3001/task/list')
                const data = await res.json()
                setToDoList(data)
            } catch (error) {
                console.log(error);
            }
       };
       getListTask()
    }, [toDoList])
  return (
    <>
        <div><button id='3'  onClick={(e) => handleClick(e)}>Nueva Tarea</button></div>
            <div className="task-list">
                {
                    toDoList.length > 0  ?
                            toDoList.map((list, i) => 
                                <div key={i} className="task-item">
                                    <span >{list.taskName} <p>Estatus: {list.taskComplete ? 'Completa' : 'Incompleta'}</p> </span>      
                                    <button id='1'  onClick={(e) => handleClick(e, list)}>Detalle</button>                          
                                    <button className='button-delete' id='2'  onClick={(e) => handleClick(e, list)}>Eliminar</button>
                                    {!list.taskComplete ? <button className='button-complete'  onClick={() => handleClickCompleteTask(list)}>Completar</button>: <></>}
                                </div>           
                            )
                        :
                            <h1>Aun no hay tareas para mostrar</h1>
                }
      
            </div>
    
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
        <Snackbar
                anchorOrigin={{vertical: 'top', horizontal:'center'}}
                open={open}
                autoHideDuration={1000}
                            
        >
                <Alert variant="filled" severity="success" sx={{width: 'auto', fontSize: '14px'}}>
                    Estatus actualizado correctamente.
                </Alert>
        </Snackbar>
    </>    
  )
}
