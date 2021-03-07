const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/villagers', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/villagers')
    let villagerString = '<ul>' 

    for (villager in data.data) {
      villagerString += `<li><a href="/villagers/${data.data[villager].id}">${data.data[villager].name['name-USen']}</a></li>`
    }
    villagerString += '</ul>' 

    res.render('villagers', {
      villagers: villagerString,
      meta_description: "All the villagers."
    })
  } catch (err) {
    console.log('error getting all villagers', err)
  }
})

router.get('/villagers/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/villagers/${req.params.id}`)
    const name = data.data.name['name-USen']
    const catchPhrase = data.data['catch-phrase']

    res.render('villager', {
      name: name,
      image_uri: data.data.image_uri,
      catch_phrase: catchPhrase,
      meta_description: `${name} says ${catchPhrase}`,
      image_alt: name,
    })
  } catch (err) {
    console.log('error getting villager', err)
    res.render('error', {
      error: err.message,
      meta_description: "Animal Crossing handbook -- web client for http://acnhapi.com/.",
    })
  }
})

module.exports = router
