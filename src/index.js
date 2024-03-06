import React from 'react'
import ReactDom from 'react-dom/client'

import TaskContainer from './taskManagementApp/taskContainer'


const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
    <TaskContainer/>
)