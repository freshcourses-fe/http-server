let usersDb = [
  { id: 1, name: 'Test', password: 'Test', login: 'Test' },
  { id: 2, name: 'Test', password: 'Test', login: 'Test' }
]

class User {
  static async getUsers () {
    return usersDb
  }

  static async getUser (userId) {
    const foundUser = usersDb.find(user => user.id === Number(userId))

    if (!foundUser) {
      throw new Error('User not Found')
    }

    return foundUser
  }

  static async createUser (userData) {
    const newUser = {
      ...userData,
      id: Date.now()
    }

    usersDb.push(newUser)

    return newUser
  }

  static async updateUser ({id, newValues}) {
    const foundUserIndex = usersDb.findIndex(user => user.id === Number(id))

    if (foundUserIndex === -1) {
      throw new Error('User not Found')
    }

    usersDb = usersDb.map((user, index) => {
      const isSameUser = index === foundUserIndex
  
      return isSameUser ? { ...user, ...newValues } : user
    })

    return usersDb[foundUserIndex]

  }

  static async deleteUser (userId) {
    const deletedUser = usersDb.find(user => user.id === Number(userId))

    if (!deletedUser) {
      throw new Error('User not Found')
    }
  
    usersDb = usersDb.filter(user => user.id !== Number(userId))


    return userId
  }
}

module.exports = User