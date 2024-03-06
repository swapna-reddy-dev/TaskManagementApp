const mongoose = require('mongoose')

const configureDb = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/task-management-app')
        console.log('successfully connected to db')
    } catch(err) {
        console.log('error connecting to db',err)
    }
}

module.exports = configureDb