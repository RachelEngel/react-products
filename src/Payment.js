import React, { Component, useEffect } from 'react';
import './App.css';
import { Table, ButtonGroup } from 'reactstrap';
import { Button, Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { deleteProductFromBug, clearProducts, updateProductCount } from './store/action';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import CounterInput from "react-counter-input";

class Payment extends Component {

  constructor(props) {
    super(props);
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
                    <td>{item['count']}</td>
                  </tr>
                )}
                <tr>
                  Total: {this.props.totalPayment}
                </tr>
              </tbody>
            </Table>
          </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
