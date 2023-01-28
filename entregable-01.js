class ProductManager {
    static description = 'Gestion de productos'
    constructor() {
        this.products = []
        this.id_prod = 1
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!(title || description || price || thumbnail || code || stock)) {
            console.error('Todos los campos deben ser ingresados')
        } else{
            let newOne = true
            this.products.forEach(x => {
                if(x.code == code){
                    console.error('El codigo ingresado corresponde a un producto existente')
                    newOne = false
                }
            });
            if (newOne){
                this.products.push({
                    id: this.id_prod,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                })
                this.id_prod++
            }
        } 
    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        let a = this.products.find((x)=> x.id === id)
        if (a){
            console.log(a)
        } else {
            console.log('Not Found')
        }
    }
}
const prod = new ProductManager()
prod.addProduct('Camiseta','Camiseta de Futbol',15000, 'www.imagendecamiseta.com', 121232, 42)
prod.addProduct('Botin','Calzado de futbol',12000, 'www.imagendebotin.com', 121233, 15)

prod.getProducts()

prod.getProductById(1)