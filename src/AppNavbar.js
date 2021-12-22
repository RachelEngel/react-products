import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Odot.css'
class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar  className="ss"  expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <div className="name"><p > Hello {this.props.user.userName}</p></div>
      <div className="up">
      <p > Several products in the cart {this.props.products.length}</p></div>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/odot"
              >Abaut</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/products">Products</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    products: state.products
  };
}

export default connect(mapStateToProps, null)(AppNavbar)
