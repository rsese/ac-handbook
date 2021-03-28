const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/bugs', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/bugs')

    res.render('bugs', {
      bugs: data.data,
      meta_description: "All the bugs."
    })
  } catch (err) {
    console.log('error getting all bugs', err)
  }
})

router.get('/bugs/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/bugs/${req.params.id}`)
    const name = data.data['file-name']

    res.render('bug', {
      name: name,
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
      meta_description: name,
      image_alt: name,
    })
  } catch (err) {
    console.log('error getting bug', err)
    res.render('error', {
      error: err.message,
      meta_description: "Animal Crossing handbook -- web client for http://acnhapi.com/.",
    })
  }
})

module.exports = router
