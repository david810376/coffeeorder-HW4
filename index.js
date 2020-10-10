const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ourDatabase', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
});

const mdb = mongoose.connection;
mdb.on('error', (err) => {
    console.error(err);
});
mdb.on('open', () => {
    console.log('Connected to mongoDb');
})

// schema for mongoDb
const CoffeeorderModel = require('./models/Coffeeorders');

// express middleware
app.use(express.json());
app.use(cors({
    origin: '*'
}));

// lowercaseOrder function will make all the orders in lowercase for the database for easier matching.
function lowercaseOrder(obj) {
    console.log(`lowercasing order: ${JSON.stringify(obj)}`);
    return {
        coffee: obj.coffee? obj.coffee.toLowerCase() : undefined,
        emailAddress: obj.emailAddress ? obj.emailAddress.toLowerCase() : undefined,
        flavor: obj.flavor? obj.flavor.toLowerCase() : undefined,
        size: obj.flavor? obj.flavor.toLowerCase() : undefined,
        strength: parseInt(obj.strength),
    };
}

// all orders
app.get('/coffeeorders', async (req, res) => {
    let allOrders = await CoffeeorderModel.find(); // 
    res.json(allOrders);
});

app.post('/coffeeorders', async (req, res) => {
    try {
        const lowerCased = lowercaseOrder(req.body);
        const record = await CoffeeorderModel.create(lowerCased); // mongodb - mongoose: create an object in the collection (returns a promise)
        res.status(201).json(record);
    } catch (e) {
        console.log(`API error: ${e}`);
        res.status(500).json({error: e});
    }
});

app.delete('/coffeeorders', async (req, res) => {
    try {
        let droppedCollection = await CoffeeorderModel.collection.drop(); // mongodb - mongoose: drop the whole collection (returns a promise)
        res.status(200).json(droppedCollection);
        
    } catch (err) {
        res.json({ error: err });
    }
    
});

app.get('/coffeeorders/:emailAddress', async (req, res) => {
    const emailAddress = req.params.emailAddress ? req.params.emailAddress.toLowerCase() : undefined; // make sure emailAddress is not an empty string.
    console.log(`looking for: ${emailAddress}`);
    let record = await CoffeeorderModel.find( { emailAddress: emailAddress } ) // (returns a promise)
    console.log(`record: ${JSON.stringify(record)}`);
    if (record) res.status(200).json(record);
    else res.sendStatus(404);
});

app.put('/coffeeorders/:emailAddress', async (req, res) => {
    const { emailAddress } = req.params;
    const {flavor, size, strength, coffee } = req.body;
    const lowerCasedOrder = lowercaseOrder({ 
        coffee: coffee, 
        emailAddress: emailAddress, 
        flavor: flavor, 
        size: size, 
        strength: strength 
    })
    console.log(`looking for: ${emailAddress}`);
    try {
        let record = await CoffeeorderModel.updateOne(  // (returns a promise)
            { emailAddress: lowerCasedOrder.emailAddress }, 
            { 
                $set: lowerCasedOrder,
                sort: { 
                    $natural: -1 
                }
        });
        res.status(200).json(record);

    } catch (e) {
        res.status(500).json({"error": `${e}`});
    }

});

app.delete('/coffeeorders/:emailAddress', async (req, res) => { 
    const { emailAddress } = req.params; // the :emaiAddress variable will be === req.params 
    const { flavor, size, strength, coffee } = req.body; // data from the reques's json body can be found in req.body
    const lowerCasedOrder = lowercaseOrder({ 
        coffee: coffee, 
        emailAddress: emailAddress, 
        flavor: flavor, 
        size: size, 
        strength: strength 
    })
    console.log(`looking for: ${emailAddress}`);

    try {
        let record = await CoffeeorderModel.findOneAndDelete( 
            { emailAddress: lowerCasedOrder.emailAddress }, 
            { sort: { $natural: -1 } // will delete the last order: https://stackoverflow.com/questions/50568108/removing-latest-document-from-mongo-db-in-single-query
        });
        res.status(200).json(record);
    } catch (e) {
        res.status(404).json({ error: err });
    }
});
 
app.listen(3000, '0.0.0.0');