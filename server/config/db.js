const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI 
//     {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

module.exports = mongoose.connection;