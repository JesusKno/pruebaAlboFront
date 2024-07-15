import React, {useState} from 'react'
import { useTakModalChangeContext } from '../TaskModalProvider';
import {useForm} from "react-hook-form"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../styles/styleTaskForm.css'
export const TaskForm = ({list}) => {
    const {register, handleSubmit} = useForm()
    const [open, setOpen] = useState(false)
    const closeModal = useTakModalChangeContext()
    console.log(list)
    const onSubmit = (data, e) =>{
        const body = JSON.stringify(data)
        console.log('Body desde el formulario para editar', body);
        const id = list._id
        console.log('Revisa el id desde el formulario para editar', id);
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(data)
        };
        try {
                
                fetch(`http://localhost:3001/update/task/${id}`, requestOptions)
                .then(response => response.json())
                .catch(error => console.error('Error', error))
                .then(result => console.log(result))
                
               
        } catch (error) {
            console.log('Error', error);
        }finally{
            setOpen(true)
            setTimeout(()=>{
                closeModal()
                e.target.reset()
            }, 4000)
        }
    }
    return(
        <>
     
                <div className="registerForm">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="title-form">Estatus: {!list.taskComplete ? 'Incompleta': 'Completa'}</h1>
                        <div className="inputContainer">
                            <input type="text" className="inputText" defaultValue={list.taskName}  {...register('taskName', { required: true})}/>
                            <label className="label">Nombre de la tarea</label>
                        </div>
                        <div className="inputContainer">
                            <input type="text" className="inputText" defaultValue={list.taskDescription}  {...register('taskDescription', { required: true})}/>
                            <label className="label">Descripcion</label>
                        </div>
                        <div className="inputContainer">
                            <input type="date" className="inputText" defaultValue={list.startDate} {...register('startDate', { required: true})}/>
                            <label className="label">Fecha inicio</label>
                        </div>
                        <div className="inputContainer">
                            <input type="date" className="inputText" defaultValue={list.endDate} {...register('endDate')}/>
                            <label className="label">Fecha final</label>
                        </div>
                        <div className="inputContainer">
                            <input type="text" className="inputText" defaultValue={list.responsiblePersonEmail} {...register('responsiblePersonEmail')} />
                            <label className="label">Responsable</label>
                        </div>
                       
                        <p>{!list.taskComplete ? 'Incompleta': 'Completa'}</p>

                        <input type="submit" className="submitButton" value="Guardar"/>
                    </form>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal:'center'}}
                    open={open}
                    autoHideDuration={1000}
                      
                >
                    <Alert variant="filled" severity="success" sx={{width: 'auto', fontSize: '14px'}}>
                        Tarea modificada correctamente.
                    </Alert>
                </Snackbar>
                
        
      
    </>
      
   
    );

}
