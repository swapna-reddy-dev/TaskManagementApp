const mongoose = require('mongoose')

const {Schema, model} = mongoose

const tasksSchema = new Schema({
    title: String,
    description: String,
    status: String,
    priority: String
},{timestamps: true})

//creating model
const Task = model('Task',tasksSchema)

module.exports = Task