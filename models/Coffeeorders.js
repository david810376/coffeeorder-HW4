const mongoose = require('mongoose');

const CoffeeOrderSchema = new mongoose.Schema({
    coffee: { type: String, required: true },
    emailAddress: { type: String, required: true },
    flavor: { type: String, required: true },
    strength: { type: Number, min: 0, max:100, required: true },
    size: { type: String, required: true },
  });


module.exports = mongoose.model('CoffeeOrder', CoffeeOrderSchema);