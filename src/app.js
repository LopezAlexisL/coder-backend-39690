const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routerProducts = require('./routes/products.router');
const routerCarts = require('./routes/carts.router');
const { Server } = require('socket.io');
const ProductManager = require('./productManager');

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const socketServer = new Server(httpServer);
const productManager = new ProductManager('src/db/products.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

socketServer.on('connection', async socket => {
	console.log('Nuevo cliente conectado');

	const products = await productManager.getProducts();
	socket.emit('products', products);

	socket.on('addProd', async prod => await productManager.addProduct(prod));

	socket.on('delProd', async id => await productManager.deleteProduct(id));
});