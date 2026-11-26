const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");
const form = document.querySelector("#formRegistro");

function validarNombre() {

    if (nombre.value.trim().length < 3) {
        document.querySelector("#errorNombre").textContent =
            "El nombre debe tener mínimo 3 caracteres";
        return false;
    }

    document.querySelector("#errorNombre").textContent = "";
    return true;
}

function validarCorreo() {

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
        document.querySelector("#errorCorreo").textContent =
            "Correo no válido";
        return false;
    }

    document.querySelector("#errorCorreo").textContent = "";
    return true;
}

function validarPassword() {

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password.value)) {
        document.querySelector("#errorPassword").textContent =
            "Min. 8 caracteres, mayúscula, minúscula, número y especial";
        return false;
    }

    document.querySelector("#errorPassword").textContent = "";
    return true;
}

// 3. VALIDACIÓN EN TIEMPO REAL

nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
password.addEventListener("input", validarPassword);

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Ejecutar las validaciones
    if (!validarNombre() || !validarCorreo() || !validarPassword()) {
        return;
    }

    // Obtener usuarios guardados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el correo ya existe
    if (usuarios.find(usuario => usuario.correo.toLowerCase() === correo.value.trim().toLowerCase())) {
        alert("Este correo ya está registrado");
        return;
    }

    // Crear objeto usuario
    const nuevoUsuario = {
        nombre: nombre.value.trim(),
        correo: correo.value.trim(),
        password: password.value
    };

    // Agregar usuario al arreglo
    usuarios.push(nuevoUsuario);

    // Guardar en LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");

    form.reset();

    window.location.href = "inicio.html";

});