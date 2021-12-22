import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import AppNavbar from './AppNavbar';
import { connect } from 'react-redux';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  // showBugList() {
  //   this.props.history.push(`/bugList/${this.props.match.params.id}`);

  // }

  mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

  render() {
      // return connect(this.mapStateToProps)(function User(props) {
        // console.log("Dddd")
        // console.log(props)
          // const { user } = props;

    return (
      <div>
        <AppNavbar />
       <div>
         {/* <p size="sm" color="primary" >{user.id}</p> */}
        </div>
        {/* <img></img> */}
      </div>
      // <Navbar  className="ss"  expand="md">
      //     <Nav className="ml-auto" navbar>
      //       <NavItem>
      //         <NavLink
      //           href="/odot">אודות</NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink href="/products">מוצרים</NavLink>
      //       </NavItem>
      //     </Nav>
      // </Navbar>
    );
  }
}

export default Home;