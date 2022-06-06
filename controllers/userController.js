let usersDb = [
  { id: 1, name: 'Test', password: 'Test', login: 'Test' },
  { id: 2, name: 'Test', password: 'Test', login: 'Test' }
]

module.exports.getUsers = (req, res) => {
  res.send(usersDb)
}

module.exports.getUser = (req, res) => {
  const {
    params: { userId }
  } = req

  const foundUser = usersDb.find(user => user.id === Number(userId))
  if (foundUser) {
    return res.send(foundUser)
  }

  res.status(404).send({ message: 'User not Found' })
}

module.exports.createUser = (req, res) => {
  const user = req.body
  console.log(user)

  user.id = Date.now()

  usersDb.push(user)

  res.send(user)
}

module.exports.updateUser = (req, res) => {
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

    return isSameUser ? { ...user, ...newUser } : user
  })

  res.send(usersDb[foundUserIndex])
}

module.exports.deleteUser = (req, res) => {
  const {
    params: { userId }
  } = req

  const deletedUser = usersDb.find(user => user.id === Number(userId))

  if (!deletedUser) {
    return res.status(404).send({ message: 'User not found' })
  }

  usersDb = usersDb.filter(user => user.id !== Number(userId))

  res.send({ id: userId })
}