const axios = require('axios')

const getAllFish = async function() {
  try {
    const data = await axios.get('https://acnhapi.com/v1/fish')

    return data.data
  } catch (err) {
    return {error: "error getting all fish"}
  }
}

const getFish = async function(id) {
  try {
    const data = await axios.get(`https://acnhapi.com/v1/fish/${id}`)

    return data.data
  } catch (err) {
    console.log('error getting fish', err)
    return {error: "error getting fish"}
  }
}

module.exports = {
  getAllFish,
  getFish
}