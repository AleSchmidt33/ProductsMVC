# Products API — MVC con Node.js y Express

API REST construida con Node.js y Express siguiendo el patrón de arquitectura MVC (Modelo, Vista, Controlador) con una capa de servicios para separar la lógica de negocio.

---

## Estructura del proyecto

```
BackMVC/
├── app.js
├── utils/
│   └── createError.js
├── routes/
│   └── productRoutes.js
├── controllers/
│   └── productController.js
├── services/
│   └── productService.js
├── models/
│   └── productModel.js
└── BrunoTests/
    ├── Get all products.bru
    ├── Get product by id.bru
    ├── Create product.bru
    ├── Update product.bru
    ├── Delete product.bru
    ├── Update stock.bru
    └── Buy product.bru
```

---

## Arquitectura

El proyecto sigue el patrón MVC extendido con una capa de servicios. Cada capa tiene una responsabilidad bien definida.

**Model** — acceso y manipulación de los datos. No conoce reglas de negocio ni HTTP.

**Service** — lógica de negocio. Valida datos, aplica reglas y coordina operaciones sobre el modelo.

**Controller** — punto de entrada HTTP. Recibe el request, delega al servicio y convierte el resultado en una respuesta HTTP.

**Routes** — mapa de URLs. Conecta cada endpoint con su función del controlador.

---

## Requisitos

- Node.js v18 o superior
- npm

---

## Instalación

```bash
git clone <url-del-repositorio>
cd BackMVC
npm install
```

---

## Uso

Iniciar el servidor:

```bash
npm start
```

El servidor corre en `http://localhost:3000`.

---

## Endpoints

### Productos

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /products | Obtener todos los productos |
| GET | /products/:id | Obtener un producto por ID |
| POST | /products | Crear un nuevo producto |
| PUT | /products/:id/update | Actualizar un producto |
| DELETE | /products/:id | Eliminar un producto |
| PATCH | /products/:id/stock | Actualizar stock de un producto |
| POST | /products/:id/buy | Registrar una venta |

---

## Ejemplos de uso

### Obtener todos los productos

```
GET http://localhost:3000/products
```

### Obtener un producto por ID

```
GET http://localhost:3000/products/1
```

### Crear un producto

```
POST http://localhost:3000/products
```

Body:
```json
{
    "name": "Teclado Mecanico",
    "price": 15000,
    "stock": 25
}
```

El campo `name` es obligatorio. `price` y `stock` son opcionales — si no se envían se asigna 0 por defecto.

### Actualizar un producto

```
PUT http://localhost:3000/products/1/update
```

Body (todos los campos son opcionales):
```json
{
    "name": "Teclado Mecanico RGB",
    "price": 18000,
    "stock": 15
}
```

### Eliminar un producto

```
DELETE http://localhost:3000/products/1
```

### Actualizar stock

```
PATCH http://localhost:3000/products/1/stock
```

Body:
```json
{
    "quantity": 10
}
```

Cantidad positiva suma stock. Cantidad negativa resta stock. La cantidad del Stock final no puede ser menor de 0

### Registrar una venta

```
POST http://localhost:3000/products/1/buy
```

Body:
```json
{
    "quantity": 3
}
```

Resta la cantidad del stock disponible y devuelve el total a cobrar. La cantidad debe ser mayor a 0 y no puede superar el stock disponible.

---

## Manejo de errores

Todos los errores siguen la misma estructura:

```json
{
    "error": "mensaje descriptivo del error"
}
```

| Status | Descripción |
|--------|-------------|
| 200 | OK |
| 201 | Recurso creado |
| 400 | Datos incorrectos o inválidos |
| 404 | Recurso no encontrado |
| 409 | Conflicto — el recurso ya existe |
| 500 | Error interno del servidor |

---

## Validaciones

- El nombre del producto es obligatorio y no puede ser un string vacío
- El precio no puede ser negativo
- El stock no puede ser negativo
- No pueden existir dos productos con el mismo nombre
- Una venta no puede realizarse si la cantidad supera el stock disponible
- Una venta debe ser de al menos 1 unidad

---

## Tests con Bruno

El ZIP `BrunoTests` contiene una colección de requests listos para importar y usar con [Bruno](https://www.usebruno.com).

Para usarlos, abrí Bruno, seleccioná `Open Collection` y apuntá a la carpeta `BrunoTests` del proyecto. Con el servidor corriendo podés ejecutar cualquier request directamente.

La colección incluye un request por cada endpoint disponible, con los bodies de ejemplo ya configurados.

---

## Datos de ejemplo

El modelo incluye 5 productos precargados para facilitar las pruebas:

| ID | Nombre | Precio | Stock |
|----|--------|--------|-------|
| 1 | Yerba Natural | 3000 | 50 |
| 2 | Mate Calabaza | 8500 | 20 |
| 3 | Bombilla Acero | 5000 | 35 |
| 4 | Termo Stanley | 25000 | 10 |
| 5 | Azucar Ledesma | 1500 | 100 |

Los datos se almacenan en memoria. Al reiniciar el servidor se restauran los valores originales.