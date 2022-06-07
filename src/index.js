const express = require('express')
const { getUser, deleteUser, updateUser, createUser, getUsers } = require('./controllers/userController')
const app = express()

const bodyParser = express.json()



app.get('/users', getUsers)

app.post('/users', bodyParser, createUser)

//  /users/12132
app.get('/users/:userId', getUser)

app.delete('/users/:userId', deleteUser)

app.put('/users/:userId', bodyParser, updateUser)

app.listen(5000, () => {
  console.log(`app is running on port ${5000}`)
})
