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
      villagers: villagerString
    })
  } catch (err) {
    console.log('error getting all villagers', err)
  }
})

router.get('/villagers/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/villagers/${req.params.id}`)

    res.render('villager', {
      name: data.data.name['name-USen'],
      image_uri: data.data.image_uri,
      catch_phrase: data.data['catch-phrase'],
    })
  } catch (err) {
    console.log('error getting villager', err)
  }
})

module.exports = router
