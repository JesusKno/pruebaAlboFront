import React, {useState} from 'react'
import { useTakModalChangeContext } from '../TaskModalProvider';
import {useForm} from "react-hook-form"
import '../styles/styleTaskForm.css'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export const FormAddNewTask = () => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState(null)
    const [action, setAction] = useState(null)
    const closeModal = useTakModalChangeContext()
    const onSubmit = (data, e) =>{
        const startDate = Date.parse(data.startDate)
        const endDate = Date.parse(data.endDate )
        if( endDate < startDate){

            console.log('La fecha final no puede ser menor a la fecha inicial');

            setOpen(true)
            setMessage('La fecha final no puede ser menor a la fecha inicial')
            setAction('error')
            setTimeout(()=>{
                setOpen(false)
            }, 3000)

        }else{

            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(data)
            };
           try {
                    
                    fetch("http://localhost:3001/new/task", requestOptions)
                    .then(response => response.json())
                    .catch(error => console.error('Error', error))
                    .then(result => console.log(result))
                    
                   
            } catch (error) {
                console.log('Error', error);
            }finally{
                setOpen(true)
                setMessage('Tarea agregada')
                setAction('success')
                setTimeout(()=>{
                    closeModal()
                    e.target.reset()
                    setOpen(true)
                }, 2000)
              
                
            }

        }
       
    }
    return(
        <>
     
                <div className="registerForm">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="title-form">Nueva Tarea</h1>
                        <div className="inputContainer">
                            
                            <input type="text" className="inputText"   {...register('taskName', { required: true})}/>
                            <label className="label">Nombre de la tarea</label>
                        </div>
                        {errors.taskName && <p className='error-save-data-task'> El campo de nombre de la tarea es obligatorio</p>}
                        <div className="inputContainer">
                            <input type="text" className="inputText" {...register('taskDescription', { required: true})}/>
                            <label className="label">Descripcion</label>
                        </div>
                        {errors.taskDescription && <p className='error-save-data-task'> La descripcion es obligatorio</p>}
                        <div className="inputContainer">
                            <input type="date" className="inputText" {...register('startDate', { required: true})}/>
                            <label className="label">Fecha inicio</label>
                        </div>
                        {errors.startDate && <p className='error-save-data-task'> La fecha de inicio es obligatorio</p>}
                        <div className="inputContainer">
                            <input type="date" className="inputText"  {...register('endDate', { required: true})}/>
                            <label className="label">Fecha final</label>
                        </div>
                        {errors.endDate && <p className='error-save-data-task'> La fecha de fin es obligatorio</p>}
                        <div className="inputContainer">
                            <input type="text" className="inputText"  {...register('responsiblePersonEmail', { required: true})} />
                            <label className="label">Responsable</label>
                        </div>
                        {errors.responsiblePersonEmail && <p className='error-save-data-task'> El correo debe de ser valido y es obligatorio</p>}
                        <input type="submit" className="submitButton" value="Guardar"/>
                    </form>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal:'center'}}
                    open={open}
                         
                >
                    <Alert variant="filled" severity={action} sx={{width: 'auto', fontSize: '14px'}}>
                        {message}
                    </Alert>
                </Snackbar>
      
    </>
      
   
    );

}