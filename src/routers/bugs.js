const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/bugs', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/bugs')
    let bugsString = '<ul>' 

    for (bug in data.data) {
      bugsString += `<li><a href="/bugs/${data.data[bug].id}">${bug}</a></li>`
    }
    bugsString += '</ul>' 

    res.render('bugs', {
      bugs: bugsString
    })
  } catch (err) {
    console.log('error getting all bugs', err)
  }
})

router.get('/bugs/:id', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/bugs/${req.params.id}`)

    res.render('bug', {
      name: data.data['file-name'],
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
    })
  } catch (err) {
    console.log('error getting bug', err)
  }
})

module.exports = router
