const express = require('express')
const app = express()

const bodyParser = express.json()

let usersDb = [
  { id: 1, name: 'Test', password: 'Test', login: 'Test' },
  { id: 2, name: 'Test', password: 'Test', login: 'Test' }
]

app.get('/users', (req, res) => {
  res.send(usersDb)
})

app.post('/users', bodyParser, (req, res) => {
  const user = req.body
  console.log(user)

  user.id = usersDb.length + 1

  usersDb.push(user)

  res.send(user)
})

//  /users/12132
app.get('/users/:userId', (req, res) => {
  const {
    params: { userId }
  } = req

  const foundUser = usersDb.find(user => user.id === Number(userId))
  if (foundUser) {
    return res.send(foundUser)
  }

  res.status(404).send({ message: 'User not Found' })
})

app.delete('/users/:userId', (req, res) => {
  const {
    params: { userId }
  } = req

  const deletedUser = usersDb.find(user => user.id === Number(userId))

  if (!deletedUser) {
    return res.status(404).send({ message: 'User not found' })
  }

  usersDb = usersDb.filter(user => user.id !== Number(userId))

  res.send({ id: userId })
})

app.put('/users/:userId', bodyParser, (req, res) => {
  const {
    params: { userId },
    body: newUser
  } = req

  const foundUserIndex = usersDb.findIndex(user => user.id === Number(userId))

  if (foundUserIndex === -1) {
    return res.status(404).send({ message: 'User not found' })
  }

  usersDb = usersDb.map((user, index) => {
    const isSameUser = index === foundUserIndex

    return isSameUser ? {...user, ...newUser} : user 
  })


  res.send(usersDb[foundUserIndex])

})

app.listen(5000, () => {
  console.log('app is running')
})
