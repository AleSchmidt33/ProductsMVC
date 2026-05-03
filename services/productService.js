const productModel = require('../models/productModel.js')
const createError = require('../utils/createError.js')


//func para vaildar stock

const validaStock = (stock) => {
    if (stock < 0) {
        throw createError('El stock no puede ser negativo', 400)
    }
}

//func para validar precio
const validaPrecio = (price) => {
    if (price < 0) {
        throw createError('El precio no puede ser negativo', 400)
    }
}

const getAllProducts = () => {

    const products = productModel.getAll()
     // por si falla DB (En este caso no hay)
    if(!products) throw createError('Error al obtener los productos', 500)
    
    return products

}

const getOneProduct = (id) =>{

    if (!id) {
        //Valida ID
        throw createError('El id es requerido', 400)
    }

    const productFound = productModel.getById(id)

    if(!productFound){

        throw createError(`Producto ${id} no encontrado`,404)
    }
    
    return ({message: `producto encontrado`,product: productFound})
}

const createProduct = (data) => {


    //Validamos que si o si traiga un nombre y no sea vacio
    if (!data.name || !data.name.trim()) {
        throw createError('El nombre del producto es requerido', 400)
    }


    //COn esto no hace falta que haga el if por null y undefined y en ambos casos remplaza con 0

    data.price = data.price ?? 0
    data.stock = data.stock ?? 0

    validaStock(data.stock)
    validaPrecio(data.price)

    const existing = productModel.getAll();
    //Valida que no existe un producto con mismo nombre
    const alreadyExists = existing.some(
        P => P.name.toLowerCase() === data.name.toLowerCase()
    );

    if (alreadyExists) {
        throw createError(`El producto ${data.name} ya existe`,409);
    }


    return ({message: `Producto creado exitosamente`, product: productModel.create(data) });
};

const updateProduct = (id, data) => {

    const productFound = productModel.getById(id)
    //validamos existencia de producto
        if (!productFound) {
        throw createError(`Producto con id: ${id} no encontrado`,404);
    }

//Validamos que los datos no vengan vacios
    if (data.stock !== undefined && data.stock !== null) validaStock(data.stock)
    if (data.price !== undefined && data.price !== null) validaPrecio(data.price)



    return ({message: `Producto actualizado correctamente`, product: productModel.update(id, data)});

}   

const deleteProduct = (id) => {
    //validamos existencia de producto
    const productFound = productModel.getById(id)

    if(!productFound) {
            throw createError(`Producto con id: ${id} no encontrado`,404)
    }
    
    const deleted = productModel.remove(id)

        if (!deleted) {
            //Validamos errores de servidor
        throw createError(`No se pudo eliminar el producto ${id}`, 500)
    }
    
    
    return ({message: `producto ${id} eliminado` })
}

const updateStock = (id, quantity, action) => {
    /*si action = 1 => comprar
      si action = 2 => actualizar*/
    const productFound = productModel.getById(id)

    if(!productFound) throw createError(`Producto ${id} no encontrado`, 404)

    
        //Actulizar stock
    if(action == 2){

        const newStock = productFound.stock + quantity
        if (newStock < 0) throw createError(`El stock no puede quedar en negativo`, 400)
        return({message: `Stock actualizado correctamente. Stock original: ${productFound.stock}, Stock actual: ${newStock}` ,product: productModel.update(id, {stock: newStock})})
        
    }else{
        //Actualizar stock en caso de venta
        if(quantity < 1){
            throw createError(`La compra no puede ser por 0 o menos`, 400)
        }
        const newStock = productFound.stock - quantity
        
        if (newStock < 0) {
            const missingStock = newStock * -1
            throw createError(`No hay suficiente stock para la venta. Faltante: ${newStock}`, 400)}
        const totalPrice = productFound.price * quantity
        return({message: `Compra realizada correctamente, total a cobrar ${totalPrice}. Stock original: ${productFound.stock}, Stock actual: ${newStock}` ,product: productModel.update(id, {stock: newStock})})

    }

    if (newStock < 0) throw createError(`El stock no puede quedar en negativo`, 400)

}


module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct , updateStock};