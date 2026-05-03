let products = [
    { id: 1, name: 'Yerba Natural',    price: 3000,  stock: 50 },
    { id: 2, name: 'Mate Calabaza',    price: 8500,  stock: 20 },
    { id: 3, name: 'Bombilla Acero',   price: 5000,  stock: 35 },
    { id: 4, name: 'Termo Stanley',    price: 25000, stock: 10 },
    { id: 5, name: 'Azucar Ledesma',   price: 1500,  stock: 100 }
];

// CREATE
const create = (data) => {
  const newProduct = {
    id: products.length + 1,
    name: data.name,
    stock: data.stock,
    price: data.price,
    createdAt: new Date()
  };
  products.push(newProduct);
  return newProduct;
};

// READ
const getAll = () => products;
const getById = (id) => products.find(p => p.id === id);

// UPDATE
const update = (id, data) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) 
    {return null;}
  products[index] = { ...products[index], ...data };
  return products[index];
};

// DELETE
const remove = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

module.exports = { create, getAll, getById, update, remove };

