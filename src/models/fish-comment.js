const db = require('../models/db')

const getComments = async function(id) {
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#read_data_once_with_an_observer
  const commentRef = db.ref(`fish/${id}/comments`);

  try {
    const snapshot = await commentRef.once('value')
    const comments = snapshot.val();

    if (comments) {
      return comments
    } else {
      return {error: "not found"}
    }
  } catch (err) {
    return {error: "error getting comments"}
  }
}

const writeComments = async function(id, comment) {
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#read_data_once_with_an_observer
  try {
    const commentsRef = db.ref(`fish/${id}/comments`)
    const newCommentsRef = commentsRef.push()
    const commentTimestamp = new Date()

    newCommentsRef.set({
      body: comment,
      timeStamp: commentTimestamp.toString()
    })

    return {
      body: comment,
      timeStamp: commentTimestamp.toString()
    }
  } catch (err) {
    return {
      error: "error writing comment",
      timeStamp: new Date().toString()
    }
  }
}

module.exports = {
  getComments: getComments,
  writeComments: writeComments
}
