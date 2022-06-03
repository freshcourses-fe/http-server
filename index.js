const express = require('express')
const fs = require('fs').promises
const path = require('path')
const app = express()

app.get(
  '/',
  (req, res, next) => {
    console.log('middleware')
    if(true) {
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

// app.post('/', (req, res, next) => {

// })

app.listen(5000, () => {
  console.log('app is running')
})
