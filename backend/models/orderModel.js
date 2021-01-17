let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderSchema = new Schema({
    client: {
        type: String,
        required: true
    },
    pizzas: [],
}, {
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema);