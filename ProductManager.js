const fs = require('fs/promises');
const path = require('path');

class ProductManager {
    static description = 'Gestion de productos'
    constructor(path) {
        this.path = path
    }

    async generateIndex(ProductsList) {
        try {
            console.log('primero')
            if (ProductsList.length === 0) return 1
            return ProductsList[ProductsList.length - 1].id + 1
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(product) {

        try {

            console.log('segundo')

            const {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            } = product


            const productsDB = await this.getProducts()

            const newId = await this.generateIndex(productsDB.products)

            const newProdToAdd = {
                id: newId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }

            productsDB.products.push(newProdToAdd)

            await fs.writeFile(this.path, JSON.stringify(productsDB))
            return newProdToAdd

        } catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        try {
            console.log('tercero')

            const getProductsFromDB = await fs.readFile(this.path, 'utf-8')
            console.log(JSON.parse(getProductsFromDB))
            return JSON.parse(getProductsFromDB)
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsById(id){
        try {
            const readDB = await this.getProducts()

            const checkId = readDB.products.find((x)=> x.id === id)
            if (checkId){
                console.log(checkId)
            } else {
                console.log('Not Found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, data){
        try {
            let prodDB = await this.getProducts();
			let prodToUpd = prodDB.products.find(prod => prod.id === id);
			if (!prodToUpd) return 'Product not found';
			let prodIndex = prodDB.products.findIndex(prod => prod.id === id);
			prodDB.products[prodIndex] = { ...prodToUpd, ...data };
			await fs.writeFile(this.path, JSON.stringify(prodDB));
          } catch (error) {
            console.log(error);
          }

    }

    async deleteProduct(id){
        try {
            const allProd = await this.getProducts()
            console.log(allProd.products)
            let filtered = allProd.products.filter((p)=>{p.id != id})
            await fs.writeFile(this.path, JSON.stringify(filtered))
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = ProductManager;