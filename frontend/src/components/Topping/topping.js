import React from 'react';
import axios from '../../service/axios';

class Topping extends React.Component {
    state = {
        name: ''
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    createTopping = async () => { 
        let shortName = this.state.name.replace(/ /g, "");
        let capitalizaName = this.capitalize(this.state.name)
        let params = {
            name: capitalizaName,
            shortName: shortName.toLowerCase()
        }
        console.log('TOPPING', params);
        await axios.post("/topping",params, {crossdomain: true})
            .then(response => {
                this.setState({
                    orders: response.data
                });
            })
            .catch(function (error) {
                console.log("ERROR HERE", error);
            });
    }

    capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    render(){
        const {name} = this.state;
        return(
            <div className="m-2">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#toppingModal">
                    Create New Topping
                </button>
                <div className="modal fade" id="toppingModal" tabIndex="-1" role="dialog" aria-labelledby="toppingModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                           
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="topping">Topping Name</label>
                                    <input type="text" name="name" value={name} className="form-control" id="topping" placeholder="Enter topping name" onChange={this.handleInputChange} />
                                </div>
                            </form>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.createTopping} data-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Topping;