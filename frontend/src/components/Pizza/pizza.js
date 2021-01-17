import React from 'react';
import axios from '../../service/axios';
import LoadPage from '../LoadPage/loadPage';

class Pizza extends React.Component {

    state = {
        name: '',
        toppings: [],
        flag: true
    }

    componentDidMount = async () => {
        this.getToppings()
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

    handleCheckboxChange = (event) => {
        const target = event.target;
        let id = event.target.value;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let toppings = this.state.toppings;
        toppings.find(item => {
            if(item._id === id){
                item.addTopping = value;
            }
        }, () => this.setState({
            toppings
        }));
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    createNewPizza = async () => {
        const {name, toppings} = this.state;
        let shortName = name.replace(/ /g, "");
        let capitalizaName = this.capitalize(name);
        const toppingsFiltered = toppings.filter(item => {
            return item.addTopping === true;
        });
        let params = {
            name: capitalizaName,
            toppings: toppingsFiltered,
            shortName: shortName.toLowerCase()
        }
        try {
            await axios.post('/pizza', params, { errorHandle: true } )
        } catch (error) {
            console.log('ERROR::', error)            
        }
        this.reloadPage();
    }

    capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    reloadPage = () => {
        this.setState({
            name: '',
            toppings: [],
            flag: true
        });
        this.getToppings()
    }

    render(){
        const {name, toppings, flag} = this.state;
        if(flag){
            return (
                <LoadPage />
            )
        }
        return(
            <div className="m-2">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#pizzaModal">
                    Create New Pizza
                </button>
                <div className="modal fade" id="pizzaModal" tabIndex="-1" role="dialog" aria-labelledby="pizzaModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create a new pizza</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="pizza" className="">Pizza Name</label>
                                        <input type="text" name="name" value={name} className="form-control" id="pizza" placeholder="Pizza Name" onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pizza" className=""> Select Toppings</label>
                                        {
                                            toppings.map((item) =>
                                                <div className="form-group row" key={item._id}>
                                                    <div className="col-sm">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id={item.name} name={item.name} value={item._id} onChange={this.handleCheckboxChange}/>
                                                            <label className="form-check-label" htmlFor={item.name}>
                                                                {item.name}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.createNewPizza} data-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pizza;