const product = require('../modals/productModal');
const { getPostData } = require('../utils')

async function getProducts(req, res) {
    try {
        const products = await product.create();

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error)
    }
}

async function getProduct(req, res, id) {
    try {
        const getProduct = await product.findById(id);

        if (!getProduct) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(getProduct));
        }
    } catch (error) {
        console.log(error)
    }
}



async function createProduct(req, res) {

    try {
        const bodyData = await getPostData(req);
        const obj = JSON.parse(bodyData);
        const newProduct = await product.createNew(obj);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}


async function updateProduct(req, res, id) {
    try {
        const getProduct = await product.findById(id);

        if (!getProduct) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            const bodyData = await getPostData(req);
            const { title, description, price } = JSON.parse(bodyData);
            const productData = {
                title: title || getProduct.title,
                description: description || getProduct.description,
                price: price || getProduct.price
            }

            const updProduct = await product.update(id, productData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updProduct));
        }
    } catch (error) {
        console.log(error)
    }
}

async function removeProduct(req, res, id) {
    try {
        const getProduct = await product.findById(id);

        if (!getProduct) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            await product.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `product ${id} removed` }));
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
}