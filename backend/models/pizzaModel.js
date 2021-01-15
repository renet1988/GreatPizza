let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let pizzaSchema = new Schema({
    name : {type:String, required:true},
    toppings: [{type: Schema.ObjectId, ref: 'topping' }],
},
{ timestamps: true }
);

module.exports = mongoose.model('pizza', pizzaSchema);