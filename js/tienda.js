const productos = [];
let carrito = [];

//Contructor de producto
class Product {
    constructor() {

    }

    addProduct(name, category, stock, price, img){
        const product = {
            'id' : this.generateId(),
            'name' : name,
            'category': category,
            'stock': stock,
            'price' : price,
            'img' : img
        };

        productos.push(product);
    }

    generateId(){
        return productos.length + 1;
    }

    getProductById(id){
        return productos.find((producto) => producto.id === id);
    }

    addProductToCart(id){
        const idProducto = parseInt(id);
        const productoFiltrado = productos.find((producto) => producto.id === idProducto);

        if(!productoFiltrado) return alert('No se encuentra el producto');
        const existeEnCarrito = carrito.findIndex((producto) => producto.id === idProducto);

        if(existeEnCarrito === -1){
            productoFiltrado.quantity = 1;
            carrito.push(productoFiltrado);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return;
        }

        if((carrito[existeEnCarrito].quantity + 1) <= productoFiltrado.stock ){
            carrito[existeEnCarrito].quantity ++;  
        }else{
            return alert('No se puede agregar, no hay mas stock');
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }

//Creo productos
const Productos = new Product();
Productos.addProduct('producto1','juegos',2,100,'https://th.bing.com/th/id/OIP.GGAs1O-ZmfBJGBCDcj0KpgHaDd?pid=ImgDet&rs=1');
Productos.addProduct('producto2','juegos',2,100,'https://th.bing.com/th/id/OIP.GGAs1O-ZmfBJGBCDcj0KpgHaDd?pid=ImgDet&rs=1');
Productos.addProduct('producto3','juegos',2,100,'https://th.bing.com/th/id/OIP.GGAs1O-ZmfBJGBCDcj0KpgHaDd?pid=ImgDet&rs=1');
Productos.addProduct('producto4','juegos',2,100,'https://th.bing.com/th/id/OIP.GGAs1O-ZmfBJGBCDcj0KpgHaDd?pid=ImgDet&rs=1');

//Muestro los productos en la tabla
const tablaProductos = document.getElementById('tablaProductos');
productos.forEach((p)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><img src="${p.img}" style="width: 80px; height: 80px;"></td>
        <td>${p.name}</td>
        <td>${p.stock}</td>
        <td>${p.price}</td>
        <td><button id="${p.id}" class="btn-agregar-producto">Agregar</button></td>
    `;
    tablaProductos.appendChild(tr);
});

//Obtengo todos los botones de agregar producto para generarles un evento
const botonesAgregarProducto = document.querySelectorAll('.btn-agregar-producto');
botonesAgregarProducto.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
       //Ejucto el metodo agregar al carrito
       const idProducto =  btn.getAttribute('id');
       Productos.addProductToCart(idProducto);
    });
});

//Redirige al carrito
document.getElementById('redirigirTienda').addEventListener('click', ()=>{
    location.href = './carrito.html';
});
