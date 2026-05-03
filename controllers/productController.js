const productService = require ('../services/productService.js')

const getProducts = (req, res) => {
    try {
        const products = productService.getAllProducts()
        res.status(200).json(products)
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ error: error.message })
    }
}

const getProductById = (req,res) =>{
try{
    const product = productService.getOneProduct(parseInt(req.params.id))
    res.status(200).json(product)
}catch(error){
    const status = error.status || 500
    res.status(status).json({error: error.message})
}}

const createNewProduct = (req, res) =>  {

    try{
        const newProduct = productService.createProduct(req.body)
        res.status(201).json(newProduct)
    }catch (error){

        const status = error.status || 500
        res.status(status).json({error: error.message})
    }

}

const updateProduct = (req,res) =>{
    try{
        const updatedProduct = productService.updateProduct(parseInt(req.params.id), req.body)
        res.status(200).json(updatedProduct)
    }catch(error){
        const status = error.status || 500
        res.status(status).json({error: error.message})
    }

} 

const removeProduct = (req,res) => {

    try{
        const result = productService.deleteProduct(parseInt(req.params.id))
        res.status(200).json({result})
    }catch(error){
        const status = error.status || 500
        res.status(status).json({error: error.message})
    }

}

const updateStock = (req,res) => {

    try{
        const result = productService.updateStock(
            parseInt(req.params.id),
            parseInt(req.body.quantity),
            2 //para actualizar
        )
        res.status(200).json({result})
    }catch(error){
        const status = error.status || 500
        res.status(status).json({error: error.message})
    }
}

const buyProduct = (req,res) => {

    try{
        const result = productService.updateStock(
            parseInt(req.params.id),
            parseInt(req.body.quantity),
            1 //para registrar venta
        )
        res.status(200).json({result})
    }catch(error){
        const status = error.status || 500
        res.status(status).json({error: error.message})
    }
}
module.exports = { getProducts, getProductById,createNewProduct, updateProduct, removeProduct, updateStock, buyProduct };