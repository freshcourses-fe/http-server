const User = require('../models/User')

module.exports.getUsers = async (req, res) => {
  const users = await User.getUsers()
  res.send(users)
}

module.exports.getUser = async (req, res) => {
  try {
    const {
      params: { userId }
    } = req
  
  const user = await User.getUser(userId)

  res.send(user)

  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

module.exports.createUser = async (req, res) => {
  const user = await User.createUser(req.body)

  res.send(user)
}

module.exports.updateUser = async (req, res) => {
  try {
    const {
      params: { userId },
      body: newUser
    } = req

    const updatedUser = await User.updateUser({
      id: userId,
      newValues: newUser
    })

    res.send(updatedUser)
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

module.exports.deleteUser = async (req, res) => {
  try {
    const {
      params: { userId }
    } = req

    const deletedId = await User.deleteUser(userId)

    res.send({ id: deletedId })
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}
