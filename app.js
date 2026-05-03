const express = require('express');
const app = express();
const PORT = 3000;
const productRoutes = require('./routes/productRoutes');

app.use(express.json());


app.use('/products', productRoutes);


// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});