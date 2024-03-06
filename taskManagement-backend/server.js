const express = require('express')
const cors = require('cors')
const configureDb = require('./config/db')
//const mongoose = require('mongoose')
const tasksCtrl = require('./app/controllers/tasks-controllers')
const tasksValidationSchema = require('./app/validations/tasks-validations')
const {checkSchema} = require('express-validator')

const app = express()

app.use(express.json())
app.use(cors())

configureDb()



//api for displaying all data
app.get('/api/tasks',tasksCtrl.list)
app.post('/api/tasks',checkSchema(tasksValidationSchema),tasksCtrl.create)
app.delete('/api/tasks/:id',tasksCtrl.destroy)
app.put('/api/tasks/:id',tasksCtrl.update)
app.get('/api/tasks/:id',tasksCtrl.listOneTask)
// app.get('/api/tasks',(req,res) => {
//     Task.find()
//         .then((task) => {
//             res.json(task)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// })

// //api for creating a task
// app.post('/api/tasks',checkSchema(tasksValidationSchema),(req,res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()})
//     }
//     const {body} = req
//     const t1 = new Task(body)
//     t1.save()
//         .then((task) => {
//             res.json(task)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// })

// //api for getting a single record
// app.get('/api/tasks/:id',(req,res) => {
//     const id = req.params.id
//     Task.findById(id)
//         .then((task) => {
//             res.json(task)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// })

// //api for updating tasks
// app.put('/api/tasks/:id',(req,res) => {
//     // const errors = validationResult(req)
//     // if(!errors.isEmpty()) {
//     //     return res.status(400).json({errors: errors.array()})
//     // }
//     const id = req.params.id
//     const {body} = req
//     Task.findByIdAndUpdate(id,body,{new: true})
//         .then((task) => {
//             res.json(task)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// })

// //api to delete a record 
// app.delete('/api/tasks/:id',(req,res) => {
//     const id = req.params.id
//     Task.findByIdAndDelete(id)
//         .then((task) => {
//             res.json(task)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// })

app.listen(3010,() => {
    console.log('express is running on port 3010')
})