const express = require('express')
const Fish = require('../models/fish')
const FishComments = require('../models/fish-comment')
const router = new express.Router()

router.post('/fish/:id/comments', async (req, res) => {
  try {
    const newComment = await FishComments.writeComments(req.params.id, req.body.comment)

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
    let fish = await Fish.getAllFish()
    let error = ""

    if (fish.error) {
      error = fish.error
      fish = {}
    }

    res.render('fishes', {
      fish: fish,
      meta_description: "All the fish.",
      error: error
    })
  } catch (err) {
    console.log('error getting all fish', err)
  }
})

router.get('/fish/:id', async (req, res) => {
  try {
    let fish = await Fish.getFish(req.params.id)
    let error = ""

    if (fish.error) {
      error = fish.error
      fish = {}
    }

    const name = fish['file-name']
    let comments = await FishComments.getComments(req.params.id)

    if (comments.error === "not found") {
      comments = {}
    }

    res.render('fish', {
      name: name,
      image_uri: fish.image_uri,
      museum_phrase: fish['museum-phrase'],
      meta_description: name,
      image_alt: name,
      comments: comments,
      comments_error: comments.error,
      error: error
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
