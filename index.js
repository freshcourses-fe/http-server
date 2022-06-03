const express = require('express')
const fs = require('fs').promises
const path = require('path')
const yup = require('yup')
const app = express()

const bodyParser = express.json()

app.get(
  '/',
  (req, res, next) => {
    console.log('middleware')
    if (true) {
      next()
    }
  },
  (req, res, next) => {
    fs.readFile(path.join(__dirname, 'view', 'index.html'), 'utf-8').then(
      data => {
        res.end(data)
      }
    )
  }
)

const LOGIN_SCHEMA = yup.object({
  login: yup.string().required(),
  password: yup.string().matches(/[A-Za-z0-9]{4,32}/).required()
})

const validateUser = (req, res, next) => {
  const user = req.body

  console.log(user)

  LOGIN_SCHEMA.validate(user).then(user=> {
    req.user = user
    next()
  }).catch(error => {
    res.status(400).send(error)
  })
}

app.post(
  '/',
  bodyParser,
  validateUser,
  (req, res, next) => {
    res.send(req.user)
  }
)

app.listen(5000, () => {
  console.log('app is running')
})
