import React, {useState} from 'react'
import { useTakModalChangeContext } from '../TaskModalProvider'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../styles/stylesElliminatedForm.css'

export const EliminatedTask = ({list}) => {
    const [open, setOpen] = useState(false)
    const closeModal = useTakModalChangeContext()
    const handleEliminar = ()=>{

        const id = list._id
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
        };
        try {
            fetch(`http://localhost:3001/delete/task/${id}`, requestOptions)
            .then(response => response.json())
            .catch(error => console.error('Error', error))
            .then(result => console.log(result))
            
           
        } catch (error) {
        console.log('Error', error);
        }finally{
            setOpen(true)
            setTimeout(()=>{
                closeModal()
            }, 4000)
           
        }

    }
    return(
        <>
     
                <div className="registerForm">
                        <div className="form">
                            <h1 className="title-form">¿Desea Eliminar esta tarea?</h1>
                            <input type="submit" className="submitButton" onClick={handleEliminar} value="Eliminar"/>
                            <input type="submit" className="submitButton" value="Cancelar"/>
                            <Snackbar
                                anchorOrigin={{vertical: 'bottom', horizontal:'center'}}
                                open={open}
                                autoHideDuration={1000}
                      
                             >
                                <Alert variant="filled" severity="success" sx={{width: 'auto', fontSize: '14px'}}>
                                    Tarea eliminada correctamente.
                                </Alert>
                            </Snackbar>
                        </div>
                </div>
               
        
      
    </>
      
   
    );

}