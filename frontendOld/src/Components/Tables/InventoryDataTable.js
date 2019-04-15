import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import moment from 'moment';

class InventoryDataTable extends Component {

  deleteItem = inventory_id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/inventory', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inventory_id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(inventory_id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.inventory_id}>
          <th className="align-middle" scope="row">{item.inventory_id}</th>
          <td className="align-middle">{item.name}</td>
          <td className="description align-middle">{item.description}</td>
          <td className="align-middle">{item.category}</td>
          <td className="align-middle">{item.sku}</td>
          <td className="align-middle text-center">{item.quantity}</td>
          <td className="align-middle text-center">{item.price}</td>
          <td className="align-middle text-center">{item.status}</td>
          <td className="align-middle">{moment(item.last_updated).calendar()}</td>
          <td className="align-middle">{moment(item.created).calendar()}</td>
          <td className="align-middle">
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
            <th>Part Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th>Actions</th>
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
