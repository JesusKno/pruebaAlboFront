import React from 'react'
import '../styles/styleTaskContainer.css'
import '../styles/stylesNav.css'

import { TaskList } from './TaskList'
import { TaskModalProvider } from '../TaskModalProvider'

export const TaskContainer = () => {

 
  return (
        <TaskModalProvider>
            <header className='container'>
                <h1 className='title-nav'>albo To Do List</h1>
            </header>
            <main className='main-container'>
                
                <div>
                    <TaskList/>
                </div>  
            </main>
        </TaskModalProvider>
        
  )
}
