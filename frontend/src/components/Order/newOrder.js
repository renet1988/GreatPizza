import React from 'react';
import Cart from '../Cart/cart';
import LoadPage from '../LoadPage/loadPage';
import axios from '../../service/axios';

class NewOrder extends React.Component {
    state ={
        client : 'Client',
        pizzas: [],
        orderCart: [],
        flag: true
    }

    componentDidMount = async () => {
        await axios.get("/pizza", {crossdomain: true})
            .then(response => {
                this.setState({
                    pizzas: response.data,
                    flag: false
                });
            })
            .catch(function (error) {
                console.log("ERROR HERE", error);
            });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleOnAddCart = (pizza) => {
        let cart = this.state.orderCart;
        let toppings = pizza.toppings.map(topping => topping.name);
        let pizzaOrder = {
            name: pizza.name,
            toppings: toppings
        }
        cart.push(pizzaOrder);
        this.setState({
            orderCart: cart
        });
    }

    render(){
        const { orderCart, flag, pizzas, client } = this.state;
        if(flag){
            return (
                <LoadPage />
            )
        }
        return(
            <div className="row col">
                <div className="col m-2 p-2 border">
                    <h4 className="text-center">Order</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="client">Client Name</label>
                        <input type="text" className="form-control" name="client" value={this.state.client} id="client" placeholder="Enter client name" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <h5 className="text-center">Menu</h5>
                        <div className="row">
                            <div className="col-5">
                                <div className="list-group" id="list-tab" role="tablist">
                                    {
                                        pizzas.map(pizza=>
                                            <a key={pizza._id} className="list-group-item list-group-item-action col-9" id={"list-"+pizza.shortName+"-list"} data-toggle="list" href={"#list-"+pizza.shortName} role="tab" aria-controls={pizza.shortName}>{pizza.name}</a>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="tab-content" id="nav-tabContent">
                                    {
                                        pizzas.map(pizza =>
                                            <div key={pizza._id+pizza.name} className="tab-pane fade show" id={"list-"+pizza.shortName} role="tabpanel" aria-labelledby={"list-"+pizza.shortName+"-list"}>
                                                <div className="row">
                                                    <div className="col-5">
                                                        <h6 className="text-center">Toppings</h6>
                                                        {
                                                            pizza.toppings.map(topping => 
                                                                <li key={topping._id} htmlFor={topping.name} className="form-check-label">
                                                                    {topping.name}
                                                                </li>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="col-5">
                                                        <button type="button" className="btn btn-primary" onClick={() => this.handleOnAddCart(pizza)}>Add cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
                <div className="col m-2 p-2 border">
                    <Cart orderCart = {orderCart} client={client} />
                </div>
            </div>
        )
    }
}

export default NewOrder;