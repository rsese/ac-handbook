const express = require('express')
const path = require('path')
const axios = require('axios').default

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/fish', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fish')
    let fish = '<ul>' 
    console.log(data.data)
    for (f in data.data) {
      console.log(f)
      fish += `<li><a href="/fish/${data.data[f].id}">${f}</a></li>`
    }
    fish += '</ul>' 

    res.send(fish)
  } catch (err) {
    console.log('error getting all fish', err)
  }
})

app.get('/fish/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/fish/${req.params.id}`)

    res.send(data.data)
  } catch (err) {
    console.log('error getting fish', err)
  }
})

app.listen(port, () => {
  console.log(`started server on port ${port}`)
})