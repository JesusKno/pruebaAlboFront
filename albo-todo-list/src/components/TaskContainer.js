import React from 'react'
import '../styles/styleTaskContainer.css'

import { TaskList } from './TaskList'
import { AddNewTaskContainer } from './AddNewTaskContainer'
import { TaskModalProvider } from '../TaskModalProvider'

export const TaskContainer = () => {

 
  return (
        <TaskModalProvider>
            <main className='main-container'>
                <div>
                    <AddNewTaskContainer/>
                </div>
                <div>
                    <TaskList/>
                </div>  
            </main>
        </TaskModalProvider>
        
  )
}
