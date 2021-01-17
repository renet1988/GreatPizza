import React from 'react';
import axios from '../../service/axios';
import Order from './order';
import NewTopping from '../Topping/topping'; 
import Pizza from '../Pizza/pizza';

class Orders extends React.Component {

    state = {
        orders: [],
        pizzas: [],
        flag: true
    }

    componentDidMount = async () => {
        await axios.get("/orders", {crossdomain: true})
            .then(response => {
                this.setState({
                    orders: response.data,
                    flag: false
                });
                this.getPizzas();
            })
            .catch(function (error) {
                console.log("ERROR HERE", error);
            });
    }

    getPizzas = async () => {
        await axios.get("/pizza", {crossdomain: true})
            .then(response => {
                this.setState({
                    pizzas: response.data,
                    flag: true
                });
            })
            .catch(function (error) {
                console.log("ERROR HERE", error);
            });
    }

    render() {
        const {orders} = this.state;
        return ( 
            <div>
                <NewTopping />
                <Pizza />
                <div>
                    {
                        orders.map((item) =>
                            <Order 
                                key={item._id}
                                orders={item}
                            />
                        )
                    } 
                </div>
                
            </div>
        )
    }

}

export default Orders;