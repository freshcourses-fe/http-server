const express = require('express')
const fs = require('fs').promises

const yup = require('yup')
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

// const LOGIN_SCHEMA = yup.object({
//   login: yup.string().required(),
//   password: yup
//     .string()
//     .matches(/[A-Za-z0-9]{4,32}/)
//     .required()
// })

// const validateUser = (req, res, next) => {
//   const user = req.body

//   console.log(user)

//   LOGIN_SCHEMA.validate(user)
//     .then(user => {
//       req.user = user
//       next()
//     })
//     .catch(error => {
//       res.status(400).send(error)
//     })
// }

// app.post('/', bodyParser, validateUser, (req, res, next) => {
//   res.send(req.user)
// })

app.listen(5000, () => {
  console.log('app is running')
})
