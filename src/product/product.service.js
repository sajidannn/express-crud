const {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require('./product.repository');

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
}

const getProductById = async (productId) => {
  const product = await findProductById(productId);

  if (!product) {
    throw Error("Product not found");
  };

  return product;
}

const addProduct = async (newProduct) => {
  const product = await insertProduct(newProduct);

  return product;
}

const deleteProductById = async (productId) => {
  await getProductById(productId);

  await deleteProduct(productId);
}

const updateProductById = async (productId, productData) => {
  await getProductById(productId);
  const product = updateProduct(productId, productData);

  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
  deleteProductById,
  addProduct,
  updateProductById,
};