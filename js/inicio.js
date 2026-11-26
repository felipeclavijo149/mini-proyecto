const bienvenida = document.querySelector("#bienvenida");
const cerrarSesion = document.querySelector("#cerrarSesion");
const formJuego = document.querySelector("#formJuego");
const listaJuegos = document.querySelector("#listaJuegos");
const mensajeFormulario = document.querySelector("#mensajeFormulario");
const botonGuardar = document.querySelector("#botonGuardar");
const botonCancelar = document.querySelector("#cancelarEdicion");

const claveJuegos = "juegosRegistrados";
let juegos = JSON.parse(localStorage.getItem(claveJuegos)) || [];
let indiceEdicion = -1;

// Mostrar el nombre de la persona que inició sesión.
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (usuario === null) {
    window.location.href = "index.html";
} else {
    bienvenida.textContent = usuario.nombre;
}

cerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
});

// Mostrar los videojuegos guardados.
function mostrarJuegos() {
    listaJuegos.textContent = "";

    if (juegos.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.className = "estado-vacio";
        mensajeVacio.textContent = "Todavía no hay videojuegos registrados.";
        listaJuegos.appendChild(mensajeVacio);
        return;
    }

    for (let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];
        const tarjeta = document.createElement("article");
        tarjeta.className = "juego-registrado";

        const titulo = document.createElement("h3");
        titulo.textContent = juego["Título"];
        tarjeta.appendChild(titulo);

        for (let campo in juego) {
            if (campo !== "Título") {
                const detalle = document.createElement("p");
                detalle.textContent = campo + ": " + juego[campo];
                tarjeta.appendChild(detalle);
            }
        }

        const botonEditar = document.createElement("button");
        botonEditar.type = "button";
        botonEditar.className = "boton-secundario";
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", function () {
            editarJuego(i);
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function () {
            eliminarJuego(i);
        });

        const acciones = document.createElement("div");
        acciones.className = "acciones-juego";
        acciones.appendChild(botonEditar);
        acciones.appendChild(botonEliminar);
        tarjeta.appendChild(acciones);
        listaJuegos.appendChild(tarjeta);
    }
}

// Cargar los datos de un videojuego en el formulario para editarlo.
function editarJuego(indice) {
    const juego = juegos[indice];

    for (let campo in juego) {
        const entrada = formJuego.querySelector('[name="' + campo + '"]');
        entrada.value = juego[campo];
    }

    indiceEdicion = indice;
    botonGuardar.textContent = "Actualizar videojuego";
    botonCancelar.hidden = false;
    mensajeFormulario.textContent = "Editando: " + juego["Título"];
}

// Eliminar un videojuego.
function eliminarJuego(indice) {
    const confirmar = confirm("¿Quieres eliminar este videojuego?");

    if (confirmar) {
        juegos.splice(indice, 1);
        localStorage.setItem(claveJuegos, JSON.stringify(juegos));

        if (indiceEdicion !== -1) {
            limpiarFormulario();
        }

        mostrarJuegos();
        mensajeFormulario.textContent = "Videojuego eliminado.";
    }
}

// Dejar el formulario listo para un nuevo videojuego.
function limpiarFormulario() {
    formJuego.reset();
    indiceEdicion = -1;
    botonGuardar.textContent = "Guardar videojuego";
    botonCancelar.hidden = true;
    mensajeFormulario.textContent = "";
    mensajeFormulario.classList.remove("mensaje-error");
}

botonCancelar.addEventListener("click", function () {
    limpiarFormulario();
});

// Guardar un videojuego nuevo o actualizar el que se está editando.
formJuego.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const datosFormulario = new FormData(formJuego);
    const juego = {};
    let camposCompletos = true;

    datosFormulario.forEach(function (valor, campo) {
        const texto = valor.toString().trim();

        if (texto === "") {
            camposCompletos = false;
        }

        juego[campo] = texto;
    });

    if (!camposCompletos || !formJuego.checkValidity()) {
        formJuego.reportValidity();
        mensajeFormulario.textContent = "Completa todos los campos correctamente.";
        mensajeFormulario.classList.add("mensaje-error");
        return;
    }

    if (indiceEdicion === -1) {
        juegos.push(juego);
        mensajeFormulario.textContent = "Videojuego guardado correctamente.";
    } else {
        juegos[indiceEdicion] = juego;
        mensajeFormulario.textContent = "Videojuego actualizado correctamente.";
    }

    localStorage.setItem(claveJuegos, JSON.stringify(juegos));
    const mensaje = mensajeFormulario.textContent;
    limpiarFormulario();
    mensajeFormulario.textContent = mensaje;
    mostrarJuegos();
});

mostrarJuegos();
