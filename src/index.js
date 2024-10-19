const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

const app = express();
dotenv.config();
const prisma = new PrismaClient();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});