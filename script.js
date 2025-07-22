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