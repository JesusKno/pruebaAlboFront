import React, {useState, useContext} from "react";


const TaskModalContext = React.createContext();

const TaskModalChangeContext = React.createContext();

export const useTaskModalContex = ()=>{
    return useContext(TaskModalContext)
};

export const useTakModalChangeContext =()=>{
    return useContext(TaskModalChangeContext)
}

export const TaskModalProvider = ({children})=> {

    const [openModal, setOpenModal] = useState(false)
    const handleOpenCloseModal = () =>{

        if(openModal === false){
            setOpenModal(true)
        }else{
            setOpenModal(false)
        }
       
        
    }

    return(
        <TaskModalContext.Provider value={openModal}>
            <TaskModalChangeContext.Provider value={handleOpenCloseModal}>

                {children}

            </TaskModalChangeContext.Provider>
        </TaskModalContext.Provider>
    );
}