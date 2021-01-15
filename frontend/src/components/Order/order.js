import React from 'react';

class Order extends React.Component{

  state = {
  }

  render(){
    return (
      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-2 mb-3 border-dark">
        <div className="h-100">
          <div className="card border-dark mb-3 h-100">
            <h5 className="card-header bg-dark text-light text-center"></h5>
            <small className="bg-dark text-light text-center"></small>
            <div className="card-body">
              <p className="card-text"></p>
            </div>
            <div className="card-footer border-light">
              <small className="text"></small>
              <button className="float-right btn btn-outline-dark btn-sm" type="button">Change Status</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Order;