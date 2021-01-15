let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let toppingSchema = new Schema({
	name : {type:String, required:true},
},
{ timestamps: true }
);

module.exports = mongoose.model('topping', toppingSchema);