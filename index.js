const path = require('path');
const ProductManager = require('./ProductManager');

const mainManager = async () => {
    try {
        const prod = new ProductManager(`${__dirname}/productDB.json`)
        

        await prod.getProducts()

        const newProd1 = {
            title: 'Celular',
            description: 'Redmi Note 9',
            price: 75000,
            thumbnail: 'www.imagendecelular.com',
            code: 1218989,
            stock: 48,
        }

        const newProd2 = {
            title: 'Celular',
            description: 'IPhone Pro Max',
            price: 75000,
            thumbnail: 'www.imagendecelular.com',
            code: 1218989,
            stock: 48,
        }

        const newProd3 = {
            title: 'CPU',
            description: 'Gaamer CPU',
            price: 285000,
            thumbnail: 'www.imagendecpu.com',
            code: 1219,
            stock: 4,
        }

        const addNewProd = await prod.addProduct(newProd1)

        prod.getProductsById(1)

        prod.updateProduct(1, newProd2)

        prod.deleteProduct(1)
    } catch (error) {
        console.log(error)
    }
}


mainManager()