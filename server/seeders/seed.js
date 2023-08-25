const db = require('../config/db');
const { Product } = require('../models');
const ProductSeeds = require('./productSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Products');

  await Product.create(ProductSeeds);

  console.log('all done!');
  process.exit(0);
});
