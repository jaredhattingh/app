const getInventoryTableData = (req, res, db) => {
  console.log('Getting inventory!');
  db.select().from('inventory').orderBy('inventory_id').then(function(data) {
    res.send(data);
  });
}

const postInventoryTableData = (req, res, db) => {
  db.insert(req.body).returning('*').into('inventory').then(function(data) {
    res.send(data);
  });
}

const putInventoryTableData = (req, res, db) => {
  const last_updated = new Date();
  const { inventory_id, photo, name, description, category, sku, material, vendor_id, quantity, price, status } = req.body
  db('inventory').where({inventory_id}).update({photo, name, description, category, sku, material, vendor_id, quantity, price, status, last_updated})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteInventoryTableData = (req, res, db) => {
  const { inventory_id } = req.body
  db('inventory').where({inventory_id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getInventoryTableData,
  postInventoryTableData,
  putInventoryTableData,
  deleteInventoryTableData
}
