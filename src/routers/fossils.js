const express = require('express')
const axios = require('axios').default

const router = new express.Router()

router.get('/fossils', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fossils')
    let fossilsString = '<ul>' 

    for (fossil in data.data) {
      fossilsString += `<li><a href="/fossils/${fossil}">${fossil}</a></li>`
    }
    fossilsString += '</ul>' 

    res.render('fossils', {
      fossils: fossilsString
    })
  } catch (err) {
    console.log('error getting all fossils', err)
  }
})

router.get('/fossils/:name', async (req, res) => {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/fossils/${req.params.name}`)

    res.render('fossil', {
      name: data.data['file-name'],
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
    })
  } catch (err) {
    console.log('error getting fossil', err)
  }
})

module.exports = router
