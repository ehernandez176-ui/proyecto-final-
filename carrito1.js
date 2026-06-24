const listaCarrito = document.getElementById('lista-carrito');
const listaCarritoOffcanvas = document.getElementById('lista-carrito-offcanvas');
const contadorCarrito = document.getElementById('contador-carrito');

// Actualiza el número del badge según los productos reales del carrito
function actualizarContador() {
  if (!contadorCarrito) return;
  const items = listaCarrito.querySelectorAll('li:not(.text-muted)');
  contadorCarrito.textContent = items.length;
}

function agregarProducto(nombreProducto) {
  // Lista principal: si está el placeholder "No hay productos", lo quitamos
  if (listaCarrito.children.length === 1 && listaCarrito.children[0].textContent === 'No hay productos') {
    listaCarrito.innerHTML = '';
  }

  const li = document.createElement('li');
  li.className = 'list-group-item agregado';
  li.textContent = nombreProducto;
  listaCarrito.appendChild(li);

  // Lista del offcanvas
  if (listaCarritoOffcanvas.children.length === 1 && listaCarritoOffcanvas.children[0].textContent === 'No hay productos') {
    listaCarritoOffcanvas.innerHTML = '';
  }

  const liOff = document.createElement('li');
  liOff.className = 'list-group-item agregado';
  liOff.textContent = nombreProducto;
  listaCarritoOffcanvas.appendChild(liOff);

  // Quitar la clase "agregado" (color verde) después de 1s
  setTimeout(() => {
    li.classList.remove('agregado');
    liOff.classList.remove('agregado');
  }, 1000);

  actualizarContador();
}

function eliminarProducto() {
  const items = listaCarrito.querySelectorAll('li:not(.text-muted)');
  const itemsOff = listaCarritoOffcanvas.querySelectorAll('li:not(.text-muted)');

  if (items.length === 0) return; // no hay nada que borrar

  const ultimo = items[items.length - 1];
  const ultimoOff = itemsOff[itemsOff.length - 1];

  ultimo.classList.add('eliminado');
  if (ultimoOff) ultimoOff.classList.add('eliminado');

  setTimeout(() => {
    ultimo.remove();
    if (ultimoOff) ultimoOff.remove();

    // Si la lista quedó vacía, volvemos a poner el placeholder
    if (listaCarrito.querySelectorAll('li:not(.text-muted)').length === 0) {
      listaCarrito.innerHTML = '<li class="list-group-item text-muted text-center">No hay productos</li>';
      listaCarritoOffcanvas.innerHTML = '<li class="list-group-item text-muted text-center">No hay productos</li>';
    }

    actualizarContador();
  }, 500);
}
