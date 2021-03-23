const express = require('express')
const axios = require('axios').default
const firebase = require("firebase");

const router = new express.Router()

// doesn't need to be private: https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
  apiKey: "AIzaSyDCFJQGDSrbC8NSxFn3iZb6KIogj1aXUBE",
  authDomain: "ac-handbook.firebaseapp.com",
  databaseURL: "https://ac-handbook-default-rtdb.firebaseio.com",
  projectId: "ac-handbook",
  storageBucket: "ac-handbook.appspot.com",
  messagingSenderId: "31917484511",
  appId: "1:31917484511:web:07e537e3db2c536cb63c6a",
};

firebase.initializeApp(firebaseConfig);
firebase.database()

router.get('/fish/:id/comments', async (req, res) => {
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#read_data_once_with_an_observer
  const commentRef = firebase.database().ref('fish/' + req.params.id + '/comments');

  try {
    const snapshot = await commentRef.once('value')
    const comments = snapshot.val();

    if (comments) {
      res.send(comments)
    } else {
      res.status(404).send({message: "not found"})
    }
  } catch (err) {
    res.status(500).send({message: "error getting comments"})
  }
})

router.post('/fish/:id/comments', async (req, res) => {
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#read_data_once_with_an_observer
  try {
    const commentsRef = firebase.database().ref('fish/' + req.params.id + '/comments')
    const newCommentsRef = commentsRef.push()
    const commentTimestamp = new Date()

    newCommentsRef.set({
      body: req.body.comment,
      timeStamp: commentTimestamp.toString()
    })
 
    res.send({
      body: req.body.comment,
      timeStamp: commentTimestamp.toString()
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get('/fish', async (req, res) => {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fish')
    let fishString = '<ul>' 

    for (fish in data.data) {
      fishString += `<li><a href="/fish/${data.data[fish].id}">${fish}</a></li>`
    }
    fishString += '</ul>' 

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

    const commentRef = firebase.database().ref('fish/' + req.params.id + '/comments');
    const snapshot = await commentRef.once('value')
    let comments = snapshot.val();

    if (!comments) {
      comments = {}
    }

    res.render('fish', {
      name: name,
      image_uri: data.data.image_uri,
      museum_phrase: data.data['museum-phrase'],
      meta_description: name,
      image_alt: name,
      comments: comments,
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
