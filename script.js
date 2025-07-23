function guardarProducto(producto) {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push(producto);
  localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos() {
  return JSON.parse(localStorage.getItem('productos')) || [];
}

function cargarProductosPorCategoria(categoria) {
  return cargarProductos().filter(p => p.categoria === categoria);
}

function cargarCategorias() {
  return ['Samseng', 'Lenterdit', 'Grandiet', 'Levex'];
}

function mostrarProductos() {
  const productos = cargarProductos();
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = '';

  productos.forEach((producto, index) => {
    const item = document.createElement('div');
    item.className = 'producto-item';

    // Imagen solo si existe
    const imagenHTML = producto.img
      ? `<img src="${producto.img}" alt="${producto.nombre}" class="producto-imagen">`
      : '';

    item.innerHTML = `
      ${imagenHTML}
      <div class="producto-detalles">
        <h3>${producto.nombre}</h3>
        <small>${producto.bulto} por bulto</small>
        <input type="number" min="0" placeholder="Cantidad necesaria" value="${producto.cantidad || ''}"
               onchange="actualizarCantidad(${index}, this.value, this.nextElementSibling)">
        <div class="resultado-bultos" style="display: ${producto.cantidad ? 'block' : 'none'};"></div>
        <button onclick="eliminarProducto(${index})" class="eliminar-btn">🗑️ Eliminar</button>
      </div>
    `;

    contenedor.appendChild(item);

    // Si ya había cantidad, recalculamos para mostrar el resultado
    if (producto.cantidad) {
      actualizarCantidad(index, producto.cantidad, item.querySelector('.resultado-bultos'));
    }
  });
}

function actualizarCantidad(index, valor, resultadoDiv) {
  const productos = cargarProductos();
  const cantidad = parseInt(valor);
  const producto = productos[index];

  if (!isNaN(cantidad) && cantidad > 0) {
    producto.cantidad = cantidad;
    const bultos = Math.ceil(cantidad / producto.bulto);
    const sobrante = bultos * producto.bulto - cantidad;
    resultadoDiv.textContent = `Necesitás ${bultos} bulto${bultos > 1 ? 's' : ''} y sobran ${sobrante}`;
    resultadoDiv.style.display = 'block';
  } else {
    delete producto.cantidad;
    resultadoDiv.style.display = 'none';
  }

  localStorage.setItem('productos', JSON.stringify(productos));
}

function eliminarProducto(index) {
  const productos = cargarProductos();
  productos.splice(index, 1);
  localStorage.setItem('productos', JSON.stringify(productos));
  mostrarProductos(); // Recarga la lista sin el producto eliminado
}

document.addEventListener('DOMContentLoaded', mostrarProductos);