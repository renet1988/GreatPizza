import React from 'react';
import axios from '../../service/axios';

class Order extends React.Component{

    state = {
        orders: [],
        flag: true
    }

    componentDidMount = async () => {
        await axios.get("/orders", {crossdomain: true})
            .then(response => {
                this.setState({
                    orders: response.data,
                    flag: false
                });
            })
            .catch(function (error) {
                console.log("ERROR HERE", error);
            });
    }

    render(){
        const {orders} = this.props;
        return (
        <div className="col-12  mt-2 mb-3 border-dark">
            <div className="h-100">
                <div className="card border-dark mb-3 h-100">
                    <div className="card-body">
                        <div>
                            {orders.client}
                        </div>
                        <div>  
                            {
                                orders.pizzas.map((pizza,index)=>
                                    <ul className="list-group" key={pizza.name+index}>
                                        <li className="list-group-item list-group-item-action">
                                            {pizza.name}
                                            <ul className="list-group list-group-horizontal-sm col-12">
                                                {
                                                    pizza.toppings.map((topping,index) =>
                                                        <li className="list-group-item col" key={topping+index} >{topping}</li>
                                                    )
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Order;