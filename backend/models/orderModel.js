let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let orderSchema = new Schema({
    client : {type:String, required:true},
    pizzas: [{type: Schema.ObjectId, ref: 'pizza' }],
},
{ timestamps: true }
);

module.exports = mongoose.model('order', orderSchema);