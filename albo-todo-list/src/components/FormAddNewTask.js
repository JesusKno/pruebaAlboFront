import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import '../styles/styleTaskForm.css'
export const FormAddNewTask = ({list}) => {
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)
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
       /*  try {
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
        
      
    </>
      
   
    );

}