const express = require('express')
const app = express()
const port = 3000

// simple middleware
app.use((req, res, next) => {
  console.log("Request received")
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
