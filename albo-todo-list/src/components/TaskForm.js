import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import '../styles/styleTaskForm.css'
import Button from '@mui/material/Button';
export const TaskForm = ({list}) => {
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)
    console.log(list);
    const onSubmit = (data, e) =>{
        const body = JSON.stringify(data)
        console.log('Body desde el formulario para editar', body);
        const id = list._id
        console.log('Revisa el id desde el formulario para editar', id);
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(data)
        };
     /*    try {
                setLoading(true)
                fetch("http://localhost:3001/admin/nuevo/producto", requestOptions)
                .then(response => response.json())
                .catch(error => console.error('Error', error))
                .then(result => console.log(result))
                
               
        } catch (error) {
            console.log('Error', error);
        }finally{
            setLoading(false)
            e.target.reset()
        } */
    }
    return(
        <>
     
                <div className="registerForm">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="title-form">{list.taskName}</h1>
                        <div className="inputContainer">
                            <input type="text" className="inputText" defaultValue={list.taskDescription}  {...register('codigoProducto', { required: true})}/>
                            <label className="label">Descripcion</label>
                        </div>
                        <div className="inputContainer">
                            <input type="date" className="inputText" defaultValue={list.startDate} {...register('nombreProducto', { required: true})}/>
                            <label className="label">Fecha inicio</label>
                        </div>
                        <div className="inputContainer">
                            <input type="date" className="inputText" defaultValue={list.endDate} {...register('descripcionProducto')}/>
                            <label className="label">Fecha final</label>
                        </div>
                        <div className="inputContainer">
                            <input type="text" className="inputText" defaultValue={list.responsiblePersonEmail} {...register('costoProducto')} />
                            <label className="label">Responsable</label>
                        </div>
                        <input type="submit" className="submitButton" value="Registrar"/>
                    </form>
                </div>
        
      
    </>
      
   
    );

}
