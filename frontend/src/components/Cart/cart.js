import React from 'react'
import axios from '../../service/axios';
import LoadPage from '../LoadPage/loadPage';

class Cart extends React.Component{

    state ={
        orderCart: [],
        toppings: [],
        flag: true, 
        index: 0
    }

    componentDidMount = () => {
        this.setState({
            orderCart: this.props.orderCart
        });
        this.getToppings();
    }

    getToppings = async () => {
        await axios.get("/topping", {crossdomain: true})
            .then(response => {
                this.setState({
                    toppings: response.data,
                    flag: false
                });
            })
            .catch(function (error) {
                console.log("ERROR HERE", error);
            });
    }

    handleDeleteTopping = (index,topping) => {
        let { orderCart } = this.state;
        let toppings = orderCart[index].toppings;
        let newArrayToppings = toppings.filter(item =>{
            return item !== topping;
        })
        orderCart[index].toppings = newArrayToppings
        this.setState({
            orderCart: orderCart
        });
    }

    handleChangeIndex = (index) => {
        this.setState({
            index: index
        });
    }

    handleAddTopping = (topping) => {
        let {orderCart, index} = this.state
        let order = orderCart[index];
        order.toppings.push(topping);
        orderCart[index] = order
        this.setState({
            orderCart: orderCart
        })
    }

    handleCreateOrder = async () => {
        let capitalizaName = this.capitalize(this.props.client)
        let params = {
            client: capitalizaName,
            pizzas: this.state.orderCart
        }
        await axios.post("/orders",params, {crossdomain: true})
            .then(response => {
                this.setState({
                    orders: response.data
                });
            })
            .catch(function (error) {
                console.log("ERROR HERE", error);
            });
            this.reloadPage();
    }

    capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    reloadPage = () => {
        this.setState({
            orderCart: [],
            toppings: [],
            flag: true, 
            index: 0
        })
        this.getToppings();
        this.props.onReloadPage();
    }

    render(){
        const {orderCart, toppings, flag} = this.state;
        if(flag){
            return(
                <LoadPage />
            )
        }
        return(
            <div>
                <h4 className="text-center">Order Cart</h4>
                <table className="table table-borderless table-sm">
                    {
                        orderCart.map((order,index) =>
                            <thead className="border" key={order.name+index}>
                                <tr>
                                    <th>{order.name}</th>
                                    <th>
                                    </th>
                                </tr>
                                <tr >
                                    {
                                        order.toppings.map(topping =>
                                            <td key={topping}>
                                                {topping}
                                                <button className="btn btn-danger btn-sm" onClick={()=>this.handleDeleteTopping(index,topping)}>
                                                    x
                                                </button>
                                            </td>
                                        )
                                    }
                                    <td>
                                        <button className="btn btn-success btn-sm" data-toggle="modal" data-target="#addToppingModal" onClick={()=>this.handleChangeIndex(index)}>
                                            Add Topping
                                        </button>
                                    </td>
                                </tr>
                            </thead>    
                        )
                    }
                </table>
                <button type="button" className="btn btn-primary" onClick={this.handleCreateOrder}>Save</button>

                <div className="modal fade" id="addToppingModal" tabIndex="-1" role="dialog" aria-labelledby="addToppingModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                           
                        <div className="modal-body">
                            {
                                toppings.map(item =>
                                    <div className="form-group row" key={item._id}>
                                        <div className="col-sm">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id={item.name} name={item.name} value={item._id} onChange={() =>this.handleAddTopping(item.name)} />
                                                <label className="form-check-label" htmlFor={item.name}>
                                                    {item.name}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default Cart;