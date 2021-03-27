const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/fossils', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fossils')

    res.render('fossils', {
      fossils: data.data,
      meta_description: "All the fossils."
    })
  } catch (err) {
    console.log('error getting all fossils', err)
  }
})

router.get('/fossils/:name', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/fossils/${req.params.name}`)
    const name = data.data['file-name']

    res.render('fossil', {
      name: name, 
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
      meta_description: name,
      image_alt: name,
    })
  } catch (err) {
    console.log('error getting fossil', err)
    res.render('error', {
      error: err.message,
      meta_description: "Animal Crossing handbook -- web client for http://acnhapi.com/.",
    })
  }
})

module.exports = router
