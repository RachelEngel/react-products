import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Button, Container } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import { connect } from 'react-redux';
import { updateUser, clearProducts } from './store/action';
import './login.css'

class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {userName: '', password: '', showModal: false, modalMessage: ''};
    this.checkUser = this.checkUser.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  async checkUser() {    
    await fetch(`api/users/${this.state.userName}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.props.updateUser(data)
      this.props.clearProducts()
      this.props.history.push(`/odot`);
    }) 
    .catch((err) => {
      this.setState({showModal: true, modalMessage: 'User not Found'})
    })
  }
  
  async signUp() {
    const newUser = {
      "userName":this.state.userName,
      "password":this.state.password
    }
    await fetch(`/api/users/createUser`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser),
    }).then(response => response.json())
    .then(async (data) => {
      if(!data){
        this.setState({showModal: true, modalMessage: 'Got error, Please try again'})
        return;
      }
      this.props.updateUser(data)
      this.props.clearProducts()
      this.props.history.push('/odot');

   }).catch((err) => {
    this.setState({showModal: true, modalMessage: 'Got error, Please try again'})
  });
  }
  handleClose = () => this.setState({showModal:false});

  handleChange(event) {
    this.setState({userName: this.refs.userNameInput.value,
                   password: this.refs.passwordInput.value})
  }

  render() {
    return (
      <div className="aa">
        <Navbar  className="ss"  expand="md">
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink></NavLink>
              </NavItem>
              <NavItem>
                <NavLink></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          <div className="welcome"><h11>Welcome to an online flower shop</h11></div>

          <div className="login">
          <label>
            User Name:
            <input type="text" 
                   value={this.state.userName}
                   ref="userNameInput"
                  onChange={this.handleChange}  />
          </label>
          <br/>
          <label>
            Password:
            <input type="text" 
                   value={this.state.password} 
                   ref="passwordInput"
                   onChange={this.handleChange} />
          </label>
          <br/>
            <Button color="primary" onClick={() => this.checkUser()}>Sign In</Button>
            <Button color="primary" onClick={() => this.signUp()}>Sign Up</Button>
          </div>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{this.state.modalMessage}</Modal.Title>
              </Modal.Header>
              <Modal.Body>Please sign Up!</Modal.Body>
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
    updateUser: user => dispatch(updateUser(user)),
    clearProducts: p => dispatch(clearProducts(p))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
