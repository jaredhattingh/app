import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class InventoryAddEditForm extends React.Component {
  state = {
    inventory_id: 0,
    name: '',
    sku: '',
    description: '',
    material: '',
    vendor_id: '',
    quantity: '',
    price: '',
    status: '',
    last_updated: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        sku: this.state.sku,
        description: this.state.description,
        material: this.state.material,
        vendor_id: this.state.vendor_id,
        quantity: this.state.quantity,
        price: this.state.price,
        status: this.state.status,
        last_updated: this.state.last_updated
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
        name: this.state.name,
        sku: this.state.sku,
        description: this.state.description,
        material: this.state.material,
        vendor_id: this.state.vendor_id,
        quantity: this.state.quantity,
        price: this.state.price,
        status: this.state.status,
        last_updated: this.state.last_updated
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
      const { inventory_id, name, sku, description, material, vendor_id, quantity, price, status, last_updated } = this.props.item
      this.setState({ inventory_id, name, sku, description, material, vendor_id, quantity, price, status, last_updated })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input type="text" name="first" id="first" onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input type="text" name="last" id="last" onChange={this.onChange} value={this.state.last === null ? '' : this.state.last}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location}  placeholder="City, State" />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input type="text" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default InventoryAddEditForm
