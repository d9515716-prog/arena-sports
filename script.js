const coordinadores = window.coordinadores || [];

let contadorID = 101;
const equiposRegistrados = [];

function cargarCoordinadores() {
    const contenedor = document.getElementById("contenedor-coordinadores");
    if (!contenedor) return;

    coordinadores.forEach((persona, indice) => {
        const card = document.createElement("article");
        card.className = "card-coordinador";
        card.style.setProperty("--card-delay", `${indice * 100}ms`);

        const foto = document.createElement("img");
        foto.src = persona.Foto;
        foto.alt = `Foto de ${persona.Nombre}`;
        foto.loading = "lazy";

        const nombre = document.createElement("h3");
        nombre.textContent = persona.Nombre;
        const rol = document.createElement("p");
        rol.innerHTML = `<strong>Rol:</strong> ${persona.Rol}`;
        const especialidad = document.createElement("p");
        especialidad.innerHTML = `<strong>Especialidad:</strong> ${persona["Especialidad en juego"]}`;

        card.append(foto, nombre, rol, especialidad);
        contenedor.appendChild(card);
    });
}

function inscribirEquipo() {
    const equipoInput = document.getElementById("nombreEquipo");
    const inputsIntegrantes = [
        document.getElementById("integrante1"),
        document.getElementById("integrante2"),
        document.getElementById("integrante3")
    ];
    const divError = document.getElementById("mensaje-error");
    const divLista = document.getElementById("lista-equipos");

    if (!equipoInput || inputsIntegrantes.some(input => !input) || !divError || !divLista) return;

    divError.textContent = "";
    const nombreEquipo = equipoInput.value.trim();
    const integrantes = inputsIntegrantes.map(input => input.value.trim());

    if (!nombreEquipo || integrantes.some(integrante => !integrante)) {
        divError.textContent = "Error: Ningún campo puede estar vacío o contener solo espacios en blanco.";
        return;
    }

    const letraGrupo = String.fromCharCode(65 + (equiposRegistrados.length % 26));
    equiposRegistrados.push({
        id: contadorID++,
        grupo: `Grupo ${letraGrupo}`,
        nombre: nombreEquipo,
        integrantes
    });

    renderizarEquipos();
    equipoInput.value = "";
    inputsIntegrantes.forEach(input => { input.value = ""; });
    equipoInput.focus();
}

function renderizarEquipos() {
    const divLista = document.getElementById("lista-equipos");
    if (!divLista) return;

    divLista.replaceChildren();
    const encabezado = document.createElement("div");
    encabezado.className = "teams-heading";
    encabezado.innerHTML = `<span class="section-index">02 / TABLA</span><h2>Equipos inscritos</h2>`;
    divLista.appendChild(encabezado);

    equiposRegistrados.forEach(eq => {
        const item = document.createElement("article");
        item.className = "card-equipo";
        item.innerHTML = `<div class="team-meta"><span>${eq.grupo}</span><strong>ID ${eq.id}</strong></div><h3>${eq.nombre}</h3><p>${eq.integrantes.join(" · ")}</p>`;
        divLista.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarCoordinadores();
    const formulario = document.getElementById("form-inscripcion");
    formulario?.addEventListener("submit", event => {
        event.preventDefault();
        inscribirEquipo();
    });
});
