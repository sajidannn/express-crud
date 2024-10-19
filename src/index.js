const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    return res.status(400).send('Product not found');
  };

  res.json(product);
});

app.post('/products', async (req, res) => {
  const newProduct = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });
  res.status(201).send({
    data: product,
    message: 'Product created successfully',
  });
});

app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });
  res.status(204).send('Product deleted successfully');
});

app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.description || !updatedProduct.image) {
    return res.status(400).send('All fields are required');
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      image: updatedProduct.image,
    },
  });
  res.send({
    data: product,
    message: 'Product updated successfully',
  });
});

app.patch('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      image: updatedProduct.image,
    },
  });
  res.send({
    data: product,
    message: 'Product updated successfully',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});