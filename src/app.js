const path = require('path');
const ProductManager = require('./ProductManager');
const express = require('express');

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }));

const mainManager = async () => {
    try {
        const prod = new ProductManager(`${__dirname}/db/productDB.json`)

        app.get('/products', async (req, res)=>{
            const limit = Number(req.query.limit);
            const getProd = await prod.getProducts()
            if(!limit){
                return res.json(getProd.products)
            } else{
                return res.json(getProd.products.slice(0,limit))
            }
        })

        app.get('/products/:pid', async (req, res)=>{
            const prodID = Number(req.params.pid)

            if(isNaN(prodID)){
                return res.json({
                    message: `The id entered is not a valid ID format. Please enter a number`,
                    queryParams: req.params
                })
            }

            const getProdByID = await prod.getProductsById(prodID)

            if(!getProdByID){
                return res.json({
                    message: `Product not found`,
                    queryParams: req.params
                })
            }else{
                return res.json({
                    product: getProdByID,
                    queryParams: req.params
                })
            }
        })


        app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));

    } catch (error) {
        console.log(error)
    }
}


mainManager()