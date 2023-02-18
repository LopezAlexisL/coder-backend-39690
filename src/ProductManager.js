const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async getProducts() {
    try {
      const productsDb = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(productsDb);
    } catch (error) {
      console.error(error);
    }
  }

  async getProductsById(id) {
    try {
      const productsDb = await this.getProducts();
      const productFound = productsDb.products.find((produt) => produt.id === id);
      console.error(productFound);

      return productFound ? productFound : console.log("Product not found");
    } catch (error) {
      console.error(error);
    }
  }

  async createProduct(product) {
    try {
      const productsDb = await this.getProducts();
      const id = await this.generateNewId(productsDb.products);
      productsDb.products.push({ id, ...product });

      await fs.writeFile(this.path, JSON.stringify(productsDb.products),(err)=>console.log(err));
      return "Product added succesfully";
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, data) {
    try {
      const productsDb = await this.getProducts();
      const productId = await this.generateNewId(id);

      let index = productsDb.findIndex((product) => product.id === id)
      productsDb[index] = { ...productId, ...data };

      await fs.writeFile(this.path, JSON.stringify(productsDb),(err)=>console.log(err));
      console.log(productsDb);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productsArray = await this.getProducts();
      const productsFiltered = productsArray.filter(
        (product) => product.id !== id
      );
      console.log(productsFiltered);
      return "Product removed succesfully";
    } catch (error) {
      console.error(error);
    }
  }

  async generateNewId(products) {
    try {
      if (products.length === 1) {
        return 1;
      }
      return products[products.length - 1].id + 1;
    } catch (error) {}
  }
}

module.exports = ProductManager;