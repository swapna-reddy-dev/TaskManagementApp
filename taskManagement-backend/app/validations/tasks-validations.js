const tasksValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: 'Title is required'
        }
    },
    description: {
        notEmpty: {
            errorMessage: 'Description is required'
        }
    },
    status: {
        notEmpty: {
            errorMessage: 'status is required'
        },
        isIn: {
            options: [['Pending','In Progress','Completed']],
            errorMessage: 'status must be selected from the given list'
        }
    },
    priority: {
        notEmpty: {
            errorMessage: 'priority is required'
        },
        isIn: {
            options: [['Low','Medium','High']],
            errorMessage: 'Priority must be selected from the given list'
        }
    }
}

module.exports = tasksValidationSchema