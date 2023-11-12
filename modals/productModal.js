let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid'); // to initialize random id
const { writeDataToFile } = require('../utils')

function create() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((element) => element.id === id)
        resolve(product);
    })
}

function createNew(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((element) => element.id === id)
        products[index] = { id, ...product };

        console.log(products[index])
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    })
}
function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((element) => element.id !== id)
        writeDataToFile('./data/products.json', products);
        resolve();
    })
}

module.exports = {
    create,
    findById,
    createNew,
    update,
    remove
}