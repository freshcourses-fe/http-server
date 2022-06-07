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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
