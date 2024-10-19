const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  deleteProductById,
  addProduct,
  updateProductById
} = require('./product.service');

router.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);

    res.json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await addProduct(newProduct);

    res.status(201).send({
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await deleteProductById(productId);
    res.status(204).send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.description || !updatedProduct.image) {
      return res.status(400).send('All fields are required');
    }
    const product = await updateProductById(productId, updatedProduct);
    res.send({
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    const product = await updateProductById(productId, updatedProduct);
    res.send({
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;