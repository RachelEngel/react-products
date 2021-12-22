import React, { Component, useEffect } from 'react';
import './App.css';
import { Table, ButtonGroup } from 'reactstrap';
import { Button, Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { deleteProductFromBug, clearProducts, updateProductCount } from './store/action';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import CounterInput from "react-counter-input";

class BugList extends Component {

  isEdit = 0;

  constructor(props) {
    super(props);
    this.state = {showModal: false,isCountEdit: false, isSave: true, modalMessage: 'האם אתה בטוח שברצונך לסיים את הקניה??'};
    this.editProductCount = this.editProductCount.bind(this)
  }
  removeProduct(product){
    this.props.deleteProductFromBug(product)
  }

  addProductCount(item, count) {
    if(count == 0){
      this.props.deleteProductFromBug(item)
      return;
    }
    var item1 = { ...item} 
    item1.count = count
    this.props.updateProductCount(item1);
  }

  openModal = () =>{
    this.setState({ showModal: true })
  } ;

  editProductCount(){
    this.state.isCountEdit = true;
  }



  handleClose = () =>  {
    this.setState({showModal:false})
  };

  saveOrder = async () => {
    this.state.isSave = false;
    const newUserOrder = {
      "userId":this.props.user.id,
      "orderDate":new Date(),
      "total": this.props.totalPayment,
      "productsList": this.props.products
    }
   
    await fetch(`/api/orders/newOrder`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserOrder),
    }).then(response => response.json())
    .then(async (data) => {
      if(data.errors){
        this.setState({showModal: true, modalMessage: 'Got error, Please try again'})
        return;
      }
      this.setState({showModal: true, modalMessage: 'Success save your order'})
      this.props.history.push('/payment');
   }).catch((err) => {
    this.setState({showModal: true, modalMessage: 'Got error, Please try again'})
  });
  }

  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>Order List</h3>
          <div className="ordersTable">
            <Table className="mt-4">
              <thead>
                <tr>
                  <th width="20%">name</th>
                  <th width="20%">price</th>
                  <th width="20%">count</th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map((item) =>
                  <tr>
                    <td>{item['name']}</td>
                    <td>{item['price']}</td>
                    <td>
                      <CounterInput count={item['count']} min={0} max={10} onCountChange={(count) => this.addProductCount(item, count)}/>
                    </td>
                    <ButtonGroup>
                      {/* <Button size="sm" color="primary" onClick={this.editProductCount}>Edit</Button> */}
                      <Button size="sm" color="danger" onClick={() => this.removeProduct(item)}>Delete from Bug</Button>
                    </ButtonGroup>
                  </tr>
                )}
                <tr>
                  Total: {this.props.totalPayment}
                </tr>
              </tbody>
              <Button size="sm" color="primary" onClick={() => this.openModal()}>Save Order</Button>
            </Table>
          </div>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>Purchase approval</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.state.modalMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                {this.state.isSave ?  <Button  variant="secondary" onClick={this.saveOrder}>
                  Yes
                </Button> : null }
              </Modal.Footer>
        </Modal>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    products: state.products,
    totalPayment: state.totalPayment
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clearProducts: p => dispatch(clearProducts(p)),
    deleteProductFromBug: product => dispatch(deleteProductFromBug(product)),
    updateProductCount: product => dispatch(updateProductCount(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BugList)
