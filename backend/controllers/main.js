//Inventory

const getTableData = (req, res, db) => {
  db.select('*').from('inventory')
    .then(items => {
        res.json(items)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
  const { name, picture, description, category, part_number, material, quantity, cost, vendor, status } = req.body
  const last_updated = new Date()
  db('inventory').insert({name, picture, description, category, part_number, material, quantity, cost, vendor, status, last_updated})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { inventory_id, name, picture, description, category, part_number, material, quantity, cost, vendor, status } = req.body
  db('inventory').where({inventory_id}).update({name, picture, description, category, part_number, material, quantity, cost, vendor, status})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { inventory_id } = req.body
  db('inventory').where({inventory_id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

//Export all previous functions

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}
