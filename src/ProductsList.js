import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import CounterInput from "react-counter-input";
import { addProductToBug, updateProductCount } from './store/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import shoshanim from './productImages/shoshanim.jpg';
import g from './productImages/גלדוליות.jpg';
import v from './productImages/ורדים.jpg';
import c from './productImages/חמניות.jpg';
import h from './productImages/חרציות.jpeg';
import l from './productImages/ליליות.jpg';
import n from './productImages/נרקיסים.jpg';
import './login.css'

class ProductsList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {productsList: [],showModal:false,productImg: '', isLoading: true};
    this.addProduct = this.addProduct.bind(this);
    this.openProductModal = this.openProductModal.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/products/getAllProducts')
      .then(response => response.json())
      .then(data => {
        this.setState({productsList: data, isLoading: false})
      } );
  }

  handleClose = () =>  {
    this.setState({showModal:false})
  };

   
  openProductModal(item) {
    this.setState({showModal:true})
    this.state.productImg = item.name;
  }

  addProduct(item) {
    if(item.count) {
      this.props.addProduct(item);

    }
  }

  addProductCount(item, count) {
    item.count = count;
    this.props.updateProductCount(item);
  }

  render() {
    const {productsList, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const products = productsList;

    return (
      <div >
        <AppNavbar/>
        <Container fluid>
          <div className="title">
            <h3 className="title_name">Products List</h3>
            <Button size="sm" color="primary" tag={Link} to="/bugList">To Pay</Button>
          </div>
          <div className="productsTable" >
            <Table className="mt-4">
              <thead>
                <tr>
                <th width="20%">name</th>
                <th width="20%">price</th>
                <th width="20%">count</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => 
                    <tr>
                      {Object.keys(item).map((value) => {
                        if(value != '_id' && value != '__v' && value != 'count' ) {
                          return <td onClick={() => this.openProductModal(item)} width="20%" >
                          {item[value]}
                          </td>
                        }
                    })}
                     <td>
                        <CounterInput min={0} max={10} onCountChange={(count) => this.addProductCount(item, count)}/>
                        </td>
                      <ButtonGroup>
                          <Button size="sm" color="danger" onClick={() => this.addProduct(item)}>Add to bug</Button>
                      </ButtonGroup>
                    </tr>
                  )}
              </tbody>
            </Table>
          </div>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                { 
                this.state.productImg == 'שושנים' ? <img src={shoshanim} /> :
                  this.state.productImg == 'גלדוליות' ? <img className="g" src={g} /> :
                this.state.productImg == 'ורדים' ? <img className="v" src={v} /> :
                this.state.productImg == 'חמניות' ? <img className="c" src={c} /> :
                this.state.productImg == 'חרציות' ? <img className="h" src={h} /> :
                this.state.productImg == 'ליליות' ? <img className="l" src={l} /> :
                this.state.productImg == 'נרקיסים' ? <img className="n" src={n} /> :
                  null
                }
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
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
    products: state.products
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProductToBug(product)),
    updateProductCount: product => dispatch(updateProductCount(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
