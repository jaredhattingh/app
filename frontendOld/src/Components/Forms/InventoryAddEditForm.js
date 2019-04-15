import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class InventoryAddEditForm extends React.Component {
  state = {
    inventory_id: 0,
    name: "",
    description: "",
    category: "",
    sku: "",
    quantity:  "",
    price: "",
    status: "",
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/inventory', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        sku: this.state.sku,
        quantity: this.state.quantity,
        price: this.state.price,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/inventory', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inventory_id: this.state.inventory_id,
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        sku: this.state.sku,
        quantity: this.state.quantity,
        price: this.state.price,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { inventory_id, photo, name, description, category, sku, material, vendor_id, quantity, price, status } = this.props.item
      this.setState({ inventory_id, photo, name, description, category, sku, material, vendor_id, quantity, price, status })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Part Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input type="text" name="category" id="category" onChange={this.onChange} value={this.state.category === null ? '' : this.state.category} />
        </FormGroup>
        <FormGroup>
          <Label for="sku">SKU</Label>
          <Input type="text" name="sku" id="sku" onChange={this.onChange} value={this.state.sku === null ? '' : this.state.sku} />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input type="text" name="quantity" id="quantity" onChange={this.onChange} value={this.state.quantity === null ? '' : this.state.quantity} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="text" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price} />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input type="text" name="status" id="status" onChange={this.onChange} value={this.state.status === null ? '' : this.state.status} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default InventoryAddEditForm
