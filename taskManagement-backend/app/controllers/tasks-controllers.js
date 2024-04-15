const Task = require('../models/task-model')
const {validationResult} = require('express-validator')

const tasksCtrl = {}

tasksCtrl.list = async (req,res) => {
    try {
        const task = await Task.find()
        res.json(task)
    } catch(err) {
        console.log(err)
        res.status(500).json({notice: 'Internal Server Error'})
    }
}

tasksCtrl.create = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {body} = req
    const task = new Task(body)
    try{
        await task.save()
        res.json(task)
    } catch(err) {
        console.log(err)
        res.status(500).json({notice: 'Internal Server Error'})
    }
}

tasksCtrl.destroy = async (req,res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(id)
        res.json(task)
    } catch(err) {
        console.log(err)
        res.status(500).json({notice: 'Internal Server Error'})
    }
}

tasksCtrl.update = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const id = req.params.id
    const {body} = req
    try {
        const task = await Task.findByIdAndUpdate(id, body, {new: true})
        res.json(task)
    } catch(err) {
        console.log(err)
        res.status(500).json({notice: 'Internal Server Error'})
    }
}

tasksCtrl.listOneTask = async (req,res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        res.json(task)
    } catch(err) {
        console.log(err)
        res.status(500).json({notice: 'Internal Server Error'})
    }
}

module.exports = tasksCtrl