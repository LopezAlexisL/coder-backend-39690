const ProductManager = require('../ProductManager');
const productManager = new ProductManager('./src/db/productDB.json')

const router = require('express').Router();


router.get("/", async (req, res) => {
    const limit = Number(req.query.limit);
    const getProd = await productManager.getProducts();

    if (!limit) {
        return res.status(200).json(getProd)
    } else {
        return res.status(200).json(getProd.slice(0, limit))
    }
})

router.get("/:pid", async (req, res) => {
    const prodId = Number(req.params.pid);

    if (isNaN(prodId)) {
        return res.json({
            message: `The id "${prodId}" entered is not a valid ID format. Please enter a number`,
            queryParams: req.params
        })
    }

    const getProdByID = await productManager.getProductsById(prodId)

    if (!getProdByID) {
        return res.status(404).json({
            message: `Product with id "${prodId}" not found`,
            queryParams: req.params
        })
    } else {
        return res.status(200).json({
            product: getProdByID,
            queryParams: req.params
        })
    }
})

router.post("/", async (req, res) => {
    const { title, description, price, category, code, stock, status } = req.body

    if (!title || !description || !code || !price || !stock || !category || !status) {
        return res.status(400).json({
            message: "All fields are required!",
        })
    }

    await productManager.createProduct(req.body);
    res.status(200).json({
        message: `Product ${title} added successfully`,
    })
})

router.put("/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const dataId = req.body;
    await productManager.updateProduct(id, dataId);
    res.status(200).json({
        message: `Product added successfully`,
    });
});

router.delete("/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    await productManager.deleteProduct(id)
    res.status(200).json({
        message: "Product deleted succesfully",
    })
})

module.exports = router;