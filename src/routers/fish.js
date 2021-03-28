const express = require('express')
const axios = require('axios').default
const fishComments = require('../models/fish-comment')

const router = new express.Router()

router.post('/fish/:id/comments', async (req, res) => {
  try {
    const newComment = await fishComments.writeComments(req.params.id, req.body.comment)

    if (newComment.error) {
      res.status(500)
    }

    res.send(newComment)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/fish', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fish')

    res.render('fishes', {
      fish: data.data,
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

    let comments = await fishComments.getComments(req.params.id)

    if (comments.error === "not found") {
      comments = {}
    }

    res.render('fish', {
      name: name,
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
      meta_description: name,
      image_alt: name,
      comments: comments,
      comments_error: comments.error
    })
  } catch (err) {
    console.log('error getting fish', err)
    res.render('error', {
      error: err.message,
      meta_description: "Animal Crossing handbook -- web client for http://acnhapi.com/.",
    })
  }
})

module.exports = router
