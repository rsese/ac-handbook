const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/fish', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fish')
    let fish = '<ul>' 

    for (f in data.data) {
      fish += `<li><a href="/fish/${data.data[f].id}">${f}</a></li>`
    }
    fish += '</ul>' 

    res.render('fishes', {
      fishes: fish
    })
  } catch (err) {
    console.log('error getting all fish', err)
  }
})

router.get('/fish/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/fish/${req.params.id}`)

    res.render('fish', {
      name: data.data['file-name'],
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
    })
  } catch (err) {
    console.log('error getting fish', err)
  }
})

module.exports = router
