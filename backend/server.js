const express = require('express')

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests


// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'anodamineapp'
  }
});

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('tiny')) // logger


// Controllers - aka, the db queries
const main = require('./controllers/main')

// API

// App Routes - Auth
app.get('/', (req, res) => res.send('RUNNING!'))
app.get('/inventory', (req, res) => main.getInventoryTableData(req, res, db))
app.post('/inventory', (req, res) => main.postInventoryTableData(req, res, db))
app.put('/inventory', (req, res) => main.putInventoryTableData(req, res, db))
app.delete('/inventory', (req, res) => main.deleteInventoryTableData(req, res, db))


// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
});
