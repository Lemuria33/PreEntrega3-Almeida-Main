const productosEnCarrito = JSON.parse(localStorage.getItem('carrito'));

//Muestro los productos en la tabla
const tablaCarrito = document.getElementById('tablaCarrito');
const mostrarProductos = ()=>{
    tablaCarrito.innerHTML = '';
    productosEnCarrito.forEach((p)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.img}" style="width: 80px; height: 80px;"></td>
            <td>${p.name}</td>
            <td>${p.stock}</td>
            <td>${p.price}</td>
            <td>${p.quantity}</td>
            <td>
                <button id="${p.id}" class="btn-minus">-</button>
                <button id="${p.id}" class="btn-add">+</button>
            </td>
        `;
        tablaCarrito.appendChild(tr);
    });

    const totalCarrito = document.getElementById('totalCarrito');
    const total = productosEnCarrito.reduce((acumulador, producto) => {
        const subtotal = producto.quantity * producto.price;
        return acumulador + subtotal;
      }, 0);

    totalCarrito.innerHTML = total;
}

//Finalizar compra
document.getElementById('finalizarCompra').addEventListener('click',()=>{
    const randomCode = Math.random().toString(36).substr(2, 8);
    if(confirm(`Gracias por su compra, su número de transacción es el siguiente:  \n ${randomCode} \n \n Usted será redirigido al inicio`)){
        localStorage.removeItem('carrito');
        location.href = './tienda.html';
    }          
})

mostrarProductos();


