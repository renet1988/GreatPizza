let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let pizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    toppings: [{
        type: Schema.ObjectId,
        ref: 'topping'
    }],
    shortName: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('pizza', pizzaSchema);