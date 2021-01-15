import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from '../Home/home';
import Header from '../Header/header';
import Order from '../Order/order';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Order />
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;