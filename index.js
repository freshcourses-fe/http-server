const http = require('http')
const fs = require('fs').promises
const path = require('path')

function requestListener (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(path.join(__dirname, 'view', 'index.html'), 'utf-8').then(
        data => {
          res.end(data)
        }
      )
    } else {
      fs.readFile(path.join(__dirname, 'view', '404.html'), 'utf-8').then(
        data => {
          res.end(data)
        }
      )
    }
  } else if (req.method === 'POST') {
    let string= ''
    req.on('data', chunk => {
      string += chunk
    })

    req.on('end', () => {
      console.log(string)
      const userData = JSON.parse(string)
      userData.id = Date.now()

      res.end(JSON.stringify(userData))
    })

    
  }
}

const server = http.createServer(requestListener)

server.listen(5000, () => {
  console.log('hi')
})
