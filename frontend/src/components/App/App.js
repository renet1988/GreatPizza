import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from '../Home/home';
import Header from '../Header/header';
import Orders from '../Order/orders';
import NewOrder from '../Order/newOrder';


function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* <Orders /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/order" component={NewOrder} />
      </div>
    </Router>
  );
}

export default App;