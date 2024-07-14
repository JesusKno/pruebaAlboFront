import React from 'react'
import '../styles/styleTaskContainer.css'

import { TaskList } from './TaskList'
import { TaskModalProvider } from '../TaskModalProvider'

export const TaskContainer = () => {

 
  return (
        <TaskModalProvider>
            <main className='main-container'>
                <div>
                    <TaskList/>
                </div>  
            </main>
        </TaskModalProvider>
        
  )
}
