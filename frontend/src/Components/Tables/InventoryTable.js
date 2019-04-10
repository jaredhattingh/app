import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/InventoryModal'

class InventoryDataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/inventory', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.inventory_id}>
          <th scope="row">{item.inventory_id}</th>
          <td>{item.name}</td>
          <td>{item.sku}</td>
          <td>{item.description}</td>
          <td>{item.material}</td>
          <td>{item.vendor_id}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          <td>{item.status}</td>
          <td>{item.last_updated}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.inventory_id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Category</th>
            <th>Material</th>
            <th>Vendor</th>
            <th>Qty</th>
            <th>Cost($)</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default InventoryDataTable
