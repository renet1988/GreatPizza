import React from 'react';
import Orders from '../Order/orders'

class Home extends React.Component{
  render() {
    return (
      <div className="container">
        <Orders/>
      </div>
    );
  }
}

export default Home;