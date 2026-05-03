const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',productController.getProducts) //Traer todos los productos
router.get('/:id',productController.getProductById) // Traer un producto por su id
router.post('/',productController.createNewProduct) // Crear nuevo producto
router.put('/:id/update',productController.updateProduct) // Actualizar un producto (nombre, precio,stock)
router.delete('/:id',productController.removeProduct) // Eleiminar un producto
router.patch('/:id/stock',productController.updateStock) /// Actaulziar stokc de un producto
router.post('/:id/buy',productController.buyProduct)// Actualizar stock de un producto en su venta

module.exports = router
