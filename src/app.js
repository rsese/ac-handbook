const express = require('express')
const axios = require('axios').default

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.get('/fish', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fish')
    let fish = '<ul>' 
    for (f in data.data) {
      fish += `<li>${f}</li>`
    }
    fish += '</ul>' 

    res.send(fish)
  } catch (err) {
    console.log('error getting fish', err)
  }
})

app.listen(port, () => {
  console.log(`started server on port ${port}`)
})