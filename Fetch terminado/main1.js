const cards= document.getElementById ('cards')
const items = document.getElementById('items')
const footer = document.getElementById ('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const tempalteCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
const DOMcarrito = document.querySelector('#carrito');
let carrito  = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        mostrarCarrito()
    }
})

cards.addEventListener ('click', e => {
    addCarrito (e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})


const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        mostrarCards(data)
    }   catch (error) {
        console.log(error)
    }
}

const mostrarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-success').dataset.id = producto.id
        templateCard.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    if (e.target.classList.contains('btn-success')){
        setCarrito(e.target.parentElement)
    }
    if (e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }
    e.stopPropagation()
}

const setCarrito = objeto =>{
    const producto = {
        id: objeto.querySelector('.btn-success').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    mostrarCarrito()
}

const mostrarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        tempalteCarrito.querySelectorAll('td')[0].textContent = producto.title
        tempalteCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        tempalteCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = tempalteCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    mostrarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const mostrarFooter = () => {
    footer.innerHTML = ''
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad,0 )
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode (true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnComprar = document.getElementById('comprar')
    btnComprar.addEventListener ('click', () => {
        Swal.fire(
            'Gracias por su compra!',
            'Realizada con exito!',
            'success'
          ),
        carrito = {}
        mostrarCarrito()
        
    })
}