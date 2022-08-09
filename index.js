const usuario = document.querySelector("#usuario");
const password = document.querySelector("#password");
const formSesion = document.querySelector("#formSesion");
const newNote = document.querySelector("#newNote");
const logOut = document.querySelector("#logOut");
const main = document.querySelector("main");
const aside = document.querySelector("aside");
const formNewNote = document.querySelector("#formNewNote");
const fechaNewNote = document.querySelector("#fechaNewNote");
const horaNewNote = document.querySelector("#horaNewNote");
const textNewNote = document.querySelector("#textNewNote");
const containerNotes = document.querySelector("#containerNotes");
const cerrarForm = document.querySelector("#cerrarForm");


// AGREGARLE HORA
// CAMBIAR ESTILO

// credenciales
const user = {
    usuario: "lautaro",
    password: "gerlero"
}

let notas = JSON.parse(localStorage.getItem("notas")) || [];

// validar usuario y pswd
formSesion.onsubmit = (e) => {
    e.preventDefault();
    if (usuario.value === user.usuario && password.value === user.password){
        main.style.display = "flex";
        aside.style.display = "none";
        localStorage.setItem("user", true)
    }
    else {
        formSesion.reset();
        alert("Usuario o contraseña incorrectos");
    }
}

// funcion para verificar si el usuario ya se logueo
function preferenciaUsuario() {
    const tokenLS = localStorage.getItem("user");
    if (tokenLS === "true") {
        main.style.display = "flex";
        aside.style.display = "none";
    }
    else if (tokenLS !== "true") {
        main.style.display = "none";
        aside.style.display = "flex";
    }
}

// ejecutar funcion
preferenciaUsuario();

// borrar el token del local storage al cerrar sesion
logOut.onclick = () => {
    localStorage.removeItem("user");
    location.reload(); // recargar la pagina
}

// abrir y cerrar formulario
newNote.onclick = () => {
    formNewNote.style.display = "flex"; 
}

cerrarForm.onclick = () => {
    formNewNote.style.display = "none";
}

// funcion para subir las notas al LS
function notasAlLS(array) {
    const arrayAJSON = JSON.stringify(array);
    localStorage.setItem("notas", arrayAJSON);
}

// recuperar los datos del LS
function valorDelLS(clave) {
    const valorTraido = localStorage.getItem(clave);
    const parsearValor = JSON.parse(valorTraido);
    return parsearValor
}


// funcion para pushear eventos
const pushearObjetos = (fecha, hora, nota, array) => array.push({
    fechaDeLaNota: fecha,
    hora: hora,
    texto: nota
})

// mostrarlas en el html
const notasAlHtml = (array) => {
    const arrayReducido = array.reduce((acc, curr) => {
        const fecha = new Date(`${curr.fechaDeLaNota} ${curr.hora}`);

        return acc + `
            <article class="notita">
                <h2>
                    ${fecha.toLocaleString()}
                </h2>
                <p>
                    ${curr.texto}
                </p>
            </article>`
    }, "")

    return arrayReducido
}


formNewNote.onsubmit = (e) => {
    e.preventDefault();
    pushearObjetos(fechaNewNote.value, horaNewNote.value, textNewNote.value, notas);
    notasAlLS(notas);
    formNewNote.reset();
    formNewNote.style.display = "none";  
    let notasDelLS = valorDelLS("notas");
    notas = notasDelLS;
    containerNotes.innerHTML = notasAlHtml(notas);
}


let notasDelLS = valorDelLS("notas");

// Si hay notas las muestra en el LS las muestra
notasDelLS ? containerNotes.innerHTML = notasAlHtml(notasDelLS) : containerNotes.innerHTML = notasAlHtml(notas)


