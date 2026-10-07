// ==================================================
// PARLEY PIZZA
// CARRITO Y PEDIDOS
// ==================================================


// =========================
// VARIABLES
// =========================

let carrito = [];

let productoPendiente = null;


// =========================
// ELEMENTOS
// =========================

const botonCarrito =
  document.getElementById("boton-carrito");

const carritoVentana =
  document.getElementById("carrito");

const cerrarCarrito =
  document.getElementById("cerrar-carrito");

const carritoProductos =
  document.getElementById("carrito-productos");

const contadorCarrito =
  document.getElementById("contador-carrito");

const totalCarrito =
  document.getElementById("total-carrito");

const vaciarCarrito =
  document.getElementById("vaciar-carrito");

const continuarPedido =
  document.getElementById("continuar-pedido");

const selectorDip =
  document.getElementById("selector-dip");

const cerrarSelectorDip =
  document.getElementById("cerrar-selector-dip");

const formularioPedido =
  document.getElementById("formulario-pedido");

const campoDireccion =
  document.getElementById("campo-direccion");


// =========================
// BOTONES DE PRODUCTOS
// =========================

const botonesAgregar =
  document.querySelectorAll(".boton-agregar");


botonesAgregar.forEach(function (boton) {

  boton.addEventListener("click", function () {

    const producto =
      boton.closest(".producto");


    if (!producto) {
      return;
    }


    const nombre =
      producto.dataset.producto;


    const precio =
      Number(producto.dataset.precio);


    const categoria =
      producto.dataset.categoria;


    const necesitaDip =
      producto.dataset.dip === "true";


    // -------------------------
    // HAMBURGUESA
    // -------------------------

    if (necesitaDip) {

      productoPendiente = {

        nombre: nombre,

        precio: precio,

        categoria: categoria

      };


      abrirSelectorDip();


      return;
    }


    // -------------------------
    // PRODUCTO NORMAL
    // -------------------------

    agregarProducto(
      nombre,
      precio,
      categoria,
      ""
    );

  });

});


// =========================
// AGREGAR PRODUCTO
// =========================

function agregarProducto(
  nombre,
  precio,
  categoria,
  dip
) {

  const productoExistente =
    carrito.find(function (producto) {

      return (
        producto.nombre === nombre &&
        producto.dip === dip
      );

    });


  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    carrito.push({

      nombre: nombre,

      precio: precio,

      categoria: categoria,

      dip: dip,

      cantidad: 1

    });

  }


  actualizarCarrito();

  abrirCarrito();

}


// =========================
// ACTUALIZAR CARRITO
// =========================

function actualizarCarrito() {

  if (!carritoProductos) {
    return;
  }


  carritoProductos.innerHTML = "";


  if (carrito.length === 0) {

    carritoProductos.innerHTML = `
            <p id="carrito-vacio">
                Todavia no agregaste ningun producto.
            </p>
        `;


    contadorCarrito.textContent = "0";

    totalCarrito.textContent = "$0";


    return;
  }


  let cantidadTotal = 0;

  let total = 0;


  carrito.forEach(function (producto, indice) {

    cantidadTotal +=
      producto.cantidad;


    const subtotal =
      producto.precio *
      producto.cantidad;


    total += subtotal;


    const productoHTML =
      document.createElement("div");


    productoHTML.className =
      "carrito-producto";


    let dipHTML = "";


    if (producto.dip) {

      dipHTML = `
                <p>
                    Dip: ${producto.dip}
                </p>
            `;

    }


    productoHTML.innerHTML = `

            <div class="carrito-producto-info">

                <h3>
                    ${producto.nombre}
                </h3>

                ${dipHTML}

                <p>
                    $${formatearPrecio(producto.precio)}
                </p>

            </div>


            <div class="cantidad-producto">

                <button
                    type="button"
                    class="menos"
                    data-indice="${indice}"
                >
                    -
                </button>

                <span>
                    ${producto.cantidad}
                </span>

                <button
                    type="button"
                    class="mas"
                    data-indice="${indice}"
                >
                    +
                </button>

            </div>


            <button
                type="button"
                class="eliminar-producto"
                data-indice="${indice}"
            >
                ✕
            </button>

        `;


    carritoProductos.appendChild(
      productoHTML
    );

  });


  contadorCarrito.textContent =
    cantidadTotal;


  totalCarrito.textContent =
    "$" + formatearPrecio(total);


  activarBotonesCarrito();

}


// =========================
// BOTONES + - ELIMINAR
// =========================

function activarBotonesCarrito() {


  const botonesMenos =
    document.querySelectorAll(".menos");


  const botonesMas =
    document.querySelectorAll(".mas");


  const botonesEliminar =
    document.querySelectorAll(
      ".eliminar-producto"
    );


  // MENOS

  botonesMenos.forEach(function (boton) {

    boton.addEventListener(
      "click",
      function () {

        const indice =
          Number(
            boton.dataset.indice
          );


        if (!carrito[indice]) {
          return;
        }


        carrito[indice].cantidad--;


        if (
          carrito[indice].cantidad <= 0
        ) {

          carrito.splice(
            indice,
            1
          );

        }


        actualizarCarrito();

      }
    );

  });


  // MAS

  botonesMas.forEach(function (boton) {

    boton.addEventListener(
      "click",
      function () {

        const indice =
          Number(
            boton.dataset.indice
          );


        if (!carrito[indice]) {
          return;
        }


        carrito[indice].cantidad++;


        actualizarCarrito();

      }
    );

  });


  // ELIMINAR

  botonesEliminar.forEach(function (boton) {

    boton.addEventListener(
      "click",
      function () {

        const indice =
          Number(
            boton.dataset.indice
          );


        if (!carrito[indice]) {
          return;
        }


        carrito.splice(
          indice,
          1
        );


        actualizarCarrito();

      }
    );

  });

}


// =========================
// FORMATEAR PRECIO
// =========================

function formatearPrecio(numero) {

  return numero.toLocaleString("es-AR");

}


// ==================================================
// CARRITO - ABRIR
// ==================================================

function abrirCarrito() {

  if (!carritoVentana) {
    return;
  }


  carritoVentana.classList.add(
    "carrito-abierto"
  );

}


// ==================================================
// CARRITO - CERRAR
// ==================================================

function cerrarCarritoFuncion() {

  if (!carritoVentana) {
    return;
  }


  carritoVentana.classList.remove(
    "carrito-abierto"
  );

}


// Boton superior del carrito

if (botonCarrito) {

  botonCarrito.addEventListener(
    "click",
    abrirCarrito
  );

}


// Boton cerrar

if (cerrarCarrito) {

  cerrarCarrito.addEventListener(
    "click",
    cerrarCarritoFuncion
  );

}


// ==================================================
// VACIAR CARRITO
// ==================================================

if (vaciarCarrito) {

  vaciarCarrito.addEventListener(
    "click",
    function () {

      carrito = [];

      actualizarCarrito();

    }
  );

}


// ==================================================
// SELECTOR DE DIP
// ==================================================

function abrirSelectorDip() {

  if (!selectorDip) {
    return;
  }


  selectorDip.classList.add(
    "selector-dip-abierto"
  );

}


function cerrarSelectorDipFuncion() {

  if (selectorDip) {

    selectorDip.classList.remove(
      "selector-dip-abierto"
    );

  }


  productoPendiente = null;

}


// Boton cerrar dip

if (cerrarSelectorDip) {

  cerrarSelectorDip.addEventListener(
    "click",
    cerrarSelectorDipFuncion
  );

}


// Click fuera de la ventana

if (selectorDip) {

  selectorDip.addEventListener(
    "click",
    function (evento) {

      if (
        evento.target === selectorDip
      ) {

        cerrarSelectorDipFuncion();

      }

    }
  );

}


// Opciones de dip

const opcionesDip =
  document.querySelectorAll(".opcion-dip");


opcionesDip.forEach(function (boton) {

  boton.addEventListener(
    "click",
    function () {

      if (!productoPendiente) {
        return;
      }


      const dip =
        boton.dataset.dip;


      agregarProducto(
        productoPendiente.nombre,
        productoPendiente.precio,
        productoPendiente.categoria,
        dip
      );


      cerrarSelectorDipFuncion();

    }
  );

});


// ==================================================
// CONTINUAR PEDIDO
// ==================================================

if (continuarPedido) {

  continuarPedido.addEventListener(
    "click",
    function () {

      if (carrito.length === 0) {

        alert(
          "Primero agrega algun producto al pedido."
        );

        return;
      }


      cerrarCarritoFuncion();


      const datosPedido =
        document.getElementById(
          "datos-pedido"
        );


      if (datosPedido) {

        datosPedido.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

}


// ==================================================
// DELIVERY / TAKE AWAY
// ==================================================

const opcionesTipoPedido =
  document.querySelectorAll(
    'input[name="tipo-pedido"]'
  );


opcionesTipoPedido.forEach(function (opcion) {

  opcion.addEventListener(
    "change",
    function () {

      if (
        this.value === "delivery"
      ) {

        campoDireccion.style.display =
          "block";

      } else {

        campoDireccion.style.display =
          "none";

      }

    }
  );

});


// ==================================================
// ENVIAR WHATSAPP
// ==================================================

if (formularioPedido) {

  formularioPedido.addEventListener(
    "submit",
    function (evento) {

      evento.preventDefault();


      if (carrito.length === 0) {

        alert(
          "No hay productos en el pedido."
        );

        return;
      }


      const nombre =
        document
          .getElementById("nombre")
          .value
          .trim();


      const direccion =
        document
          .getElementById("direccion")
          .value
          .trim();


      const tipoSeleccionado =
        document.querySelector(
          'input[name="tipo-pedido"]:checked'
        );


      if (!tipoSeleccionado) {

        alert(
          "Selecciona Delivery o Take Away."
        );

        return;

      }


      const tipo =
        tipoSeleccionado.value;


      if (!nombre) {

        alert(
          "Ingresa tu nombre."
        );

        return;

      }


      if (
        tipo === "delivery" &&
        !direccion
      ) {

        alert(
          "Ingresa una direccion para el delivery."
        );

        return;

      }


      // -------------------------
      // MENSAJE
      // -------------------------

      let mensaje =
        "Hola! Quiero hacer un pedido en Parley Pizza.\n\n";


      mensaje +=
        "*Nombre:* " +
        nombre +
        "\n";


      mensaje +=
        "*Tipo de pedido:* " +
        (
          tipo === "delivery"
            ? "Delivery"
            : "Take Away"
        ) +
        "\n";


      if (tipo === "delivery") {

        mensaje +=
          "*Direccion:* " +
          direccion +
          "\n";

      }


      mensaje +=
        "\n*PEDIDO:*\n";


      let total = 0;


      carrito.forEach(function (producto) {

        const subtotal =
          producto.precio *
          producto.cantidad;


        total += subtotal;


        mensaje +=
          producto.cantidad +
          " x " +
          producto.nombre;


        if (producto.dip) {

          mensaje +=
            " - Dip: " +
            producto.dip;

        }


        mensaje +=
          " - $" +
          formatearPrecio(subtotal) +
          "\n";

      });


      mensaje +=
        "\n*TOTAL: $" +
        formatearPrecio(total) +
        "*";


      // -------------------------
      // WHATSAPP
      // -------------------------

      const numeroWhatsApp =
        "543435325591";


      const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje);


      window.open(
        url,
        "_blank"
      );

    }
  );

}


// ==================================================
// INICIO
// ==================================================

actualizarCarrito();