import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login'
import Home from './Home';
import Odot from './Odot';
import ProductsList from './ProductsList';
import BugList from './BugList';
import { Provider } from 'react-redux'
import store from './store/store';
import AppNavbar from './AppNavbar';
import Payment from './Payment';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router >
        <Switch>
          <Route path='/' exact={true} component={Login}/>
          <Route path='/bugList' exact={true} component={BugList}/>
          <Route path='/home' exact={true} component={Home}/>
          <Route path='/odot' component={Odot}/>
          <Route path='/products' component={ProductsList}/>
            <Route path='/payment' component={Payment} />

        </Switch>
      </Router>
      </Provider>
    )
  }
}

export default App;