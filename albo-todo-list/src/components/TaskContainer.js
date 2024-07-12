import React from 'react'
import '../styles/styleTaskContainer.css'

import { TaskList } from './TaskList'
import { AddNewTaskContainer } from './AddNewTaskContainer'

export const TaskContainer = () => {

 
  return (
        <main className='main-container'>
          
                <AddNewTaskContainer/>
                <TaskList/>
           
        </main>
        
  )
}
