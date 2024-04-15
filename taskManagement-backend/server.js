const express = require('express')
const cors = require('cors')
const configureDb = require('./config/db')
//const mongoose = require('mongoose')
const tasksCtrl = require('./app/controllers/tasks-controllers')
const tasksValidationSchema = require('./app/validations/tasks-validations')
const {checkSchema} = require('express-validator')

const app = express()
const port = 3010

app.use(express.json())
app.use(cors())

configureDb()



//api for displaying all data
app.get('/api/tasks',tasksCtrl.list)
app.post('/api/tasks',checkSchema(tasksValidationSchema),tasksCtrl.create)
app.delete('/api/tasks/:id',tasksCtrl.destroy)
app.put('/api/tasks/:id',checkSchema(tasksValidationSchema),tasksCtrl.update)
app.get('/api/tasks/:id',tasksCtrl.listOneTask)


app.listen(port, () => {
    console.log('express is running on port '+ port)
})