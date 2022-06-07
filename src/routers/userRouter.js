const express = require('express')

const userRouter = express.Router()
const UserController = require('../controllers/userController')


userRouter.get('/', UserController.getUsers)

userRouter.post('/', UserController.createUser)

userRouter.get('/:userId', UserController.getUser)

userRouter.delete('/:userId', UserController.deleteUser)

userRouter.put('/:userId', UserController.updateUser)

module.exports = userRouter