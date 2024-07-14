import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import '../styles/stylesElliminatedForm.css'
import Button from '@mui/material/Button';
export const EliminatedTask = ({list}) => {
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)
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
                        <div className="form">
                            <h1 className="title-form">¿Desea Eliminar esta tarea?</h1>
                            <input type="submit" className="submitButton" value="Registrar"/>
                        </div>
                </div>
        
      
    </>
      
   
    );

}