const usuarios = [
    {
        nombre : 'Agustin',
        email : 'agus@tiendalemuria.com',
        clave : 'admin'
    },
];


//Obtenemos el form
const formLogin = document.getElementById('loginForm');
formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const clave = document.getElementById('clave').value;

    const usuarioEncontrado = usuarios.find((usuario) => usuario.email == email && usuario.clave == clave);

    if(!usuarioEncontrado){
        return alert('Credenciales incorrectas');
    }
    
    location.href = './pages/tienda.html';

});