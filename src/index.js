const express = require('express')
const router = require('./routers')

const app = express()
const bodyParser = express.json()

app.use(bodyParser)
app.use(router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
