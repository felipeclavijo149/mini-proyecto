const form = document.querySelector("#formLogin");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar usuario
    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.correo === correo.value.trim() &&
            usuario.password === password.value;
    });

    if (usuarioEncontrado) {

        // Guardar usuario activo
        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarioEncontrado)
        );

        window.location.href = "inicio.html";

    } else {

        alert("Correo o contraseña incorrectos");

    }

});