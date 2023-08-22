const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/eCommerce'; 

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
