import React, {useState} from 'react'
import { useTakModalChangeContext } from '../TaskModalProvider';
import {useForm} from "react-hook-form"
import '../styles/styleTaskForm.css'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export const FormAddNewTask = ({list}) => {
    const {register, handleSubmit} = useForm()
    const [open, setOpen] = useState(false)
    const closeModal = useTakModalChangeContext()
    console.log(list);
    const onSubmit = (data, e) =>{
        const body = JSON.stringify(data)
        console.log('Body desde el a2gregar data', body);
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
            setTimeout(()=>{
                closeModal()
                e.target.reset()
                setOpen(true)
            }, 4000)
          
            
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
                        <div className="inputContainer">
                            <input type="text" className="inputText" {...register('taskDescription', { required: true})}/>
                            <label className="label">Descripcion</label>
                        </div>
                        <div className="inputContainer">
                            <input type="date" className="inputText" {...register('startDate', { required: true})}/>
                            <label className="label">Fecha inicio</label>
                        </div>
                        <div className="inputContainer">
                            <input type="date" className="inputText"  {...register('endDate')}/>
                            <label className="label">Fecha final</label>
                        </div>
                        <div className="inputContainer">
                            <input type="text" className="inputText"  {...register('responsiblePersonEmail')} />
                            <label className="label">Responsable</label>
                        </div>
                        <input type="submit" className="submitButton" value="Registrar"/>
                    </form>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal:'center'}}
                    open={open}
                    autoHideDuration={5000}
                      
                >
                    <Alert variant="filled" severity="success" sx={{width: 'auto', fontSize: '14px'}}>
                        Tarea agregada correctamente.
                    </Alert>
                </Snackbar>
      
    </>
      
   
    );

}