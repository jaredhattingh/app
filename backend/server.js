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


// API



//where I will get inventory from db
app.get('/inventory', (req, res) => {
  console.log('Getting inventory!');
  db.select().from('inventory').orderBy('inventory_id').then(function(data) {
    res.send(data);
  });
});

//where I will add item to inventory
app.post('/inventory', (req, res) => {
  db.insert(req.body).returning('*').into('inventory').then(function(data) {
    res.send(data);
  });
});

//where I will update item in inventory
app.put('/inventory', (req, res) => {
  const { inventory_id, photo, name, description, category, sku, material, vendor_id, quantity, price, status } = req.body
  db('inventory').where({inventory_id}).update({photo, name, description, category, sku, material, vendor_id, quantity, price, status})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
});

//where I delete an item from the inventory_id
app.delete('/inventory', (req, res) => {
  const { inventory_id } = req.body
  db('inventory').where({inventory_id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
});




// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})
