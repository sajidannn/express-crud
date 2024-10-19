const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

const productController = require('./product/product.controller');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/products', productController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});