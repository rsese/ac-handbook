const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fishRouter = require('./routers/fish')
const seaCreaturesRouter = require('./routers/sea-creatures')
const villagersRouter = require('./routers/villagers')
const bugsRouter = require('./routers/bugs')
const fossilsRouter = require('./routers/fossils')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

app.use(fishRouter)
app.use(seaCreaturesRouter)
app.use(villagersRouter)
app.use(bugsRouter)
app.use(fossilsRouter)
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
  res.render('index', {
    meta_description: "Animal Crossing handbook -- web client for http://acnhapi.com/."
  })
})

// http://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses
app.use(function (req, res, next) {
  res.status(404).render('404', {
    meta_description: "Animal Crossing handbook -- web client for http://acnhapi.com/."
  })
})

app.listen(port, () => {
  console.log(`started server on port ${port}`)
})
