const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/sea-creatures', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/sea')
    let seaCreaturesString = '<ul>' 

    for (seaCreature in data.data) {
      seaCreaturesString += `<li><a href="/sea-creatures/${data.data[seaCreature].id}">${seaCreature}</a></li>`
    }
    seaCreaturesString += '</ul>' 

    res.render('sea-creatures', {
      seaCreatures: seaCreaturesString
    })
  } catch (err) {
    console.log('error getting all sea creatures', err)
  }
})

router.get('/sea-creatures/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/sea/${req.params.id}`)

    res.render('sea-creature', {
      name: data.data['file-name'],
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
    })
  } catch (err) {
    console.log('error getting sea creature', err)
  }
})

module.exports = router
