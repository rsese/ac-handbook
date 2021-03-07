const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/fish', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fish')
    let fishString = '<ul>' 

    for (fish in data.data) {
      fishString += `<li><a href="/fish/${data.data[fish].id}">${fish}</a></li>`
    }
    fishString += '</ul>' 

    res.render('fishes', {
      fishes: fishString,
      meta_description: "All the fish."
    })
  } catch (err) {
    console.log('error getting all fish', err)
  }
})

router.get('/fish/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/fish/${req.params.id}`)
    const name = data.data['file-name']

    res.render('fish', {
      name: name,
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
      meta_description: name,
      image_alt: name,
    })
  } catch (err) {
    console.log('error getting fish', err)
  }
})

module.exports = router
