const chat = document.getElementById("chat");
const input = document.getElementById("input");

let nombreUsuario = "";

// base de datos de conocimientos
const datos = {
    // animales
    perro: "El perro es un mamífero doméstico conocido por su lealtad hacia los humanos 🐶.",
    gato: "El gato es un felino ágil, independiente y excelente cazador 🐱.",
    leon: "El león es un gran felino llamado el rey de la selva 🦁.",
    elefante: "El elefante es el animal terrestre más grande y tiene gran memoria 🐘.",

    // aviones
    avion: "Un avión es una aeronave que vuela gracias a sus alas y motores ✈.",
    boeing: "Boeing es una de las compañías fabricantes de aviones más grandes del mundo.",
    airbus: "Airbus es un fabricante europeo de aviones comerciales ✈.",

    // música
    musica: "La música es el arte de combinar sonidos y ritmos 🎵.",
    guitarra: "La guitarra es un instrumento musical de cuerdas muy popular 🎸.",
    piano: "El piano es un instrumento de teclado usado en muchos géneros musicales 🎹.",

    // fútbol
    futbol: "El fútbol es un deporte donde dos equipos intentan marcar goles ⚽.",
    messi: "Lionel Messi es considerado uno de los mejores futbolistas de la historia ⚽.",
    mundial: "El Mundial es el torneo de selecciones más importante del fútbol 🌍.",

    // básquet
    basquet: "El básquet es un deporte donde se anotan puntos encestando el balón 🏀.",
    jordan: "Michael Jordan es una leyenda histórica del baloncesto 🏀.",
    nba: "La NBA es la liga profesional de baloncesto más famosa del mundo."
};

// agregar mensajes
function agregarMensaje(texto, tipo){
    const div = document.createElement("div");
    div.classList.add("message", tipo);
    div.textContent = texto;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// respuestas aleatorias
function random(lista){
    return lista[Math.floor(Math.random()*lista.length)];
}

// buscar conocimiento
function buscarDato(mensaje){
    for (let palabra in datos) {
        if (mensaje.includes(palabra)) {
            return datos[palabra];
        }
    }
    return null;
}

function pensar(mensaje){
    mensaje = mensaje.toLowerCase();

    // guardar nombre
    if(mensaje.startsWith("me llamo")){
        nombreUsuario = mensaje.replace("me llamo","").trim();
        return "Mucho gusto " + nombreUsuario + " 😃";
    }

    // saludo
    if(mensaje.includes("hola") || mensaje.includes("buenas")){
        if(nombreUsuario){
            return "Hola " + nombreUsuario + " 👋 ¿qué quieres aprender hoy?";
        }
        return random([
            "¡Hola amigo! 😃",
            "Hey 👋",
            "Buenas 😎"
        ]);
    }

    // cómo estás
    if(mensaje.includes("como estas")){
        return random([
            "Excelente 🚀",
            "Todo bien 😎 ¿y tú?",
            "Genial, gracias por preguntar 😁"
        ]);
    }

    // buscar dato
    let dato = buscarDato(mensaje);
    if(dato) return dato;

    // si no sabe
    return random([
        "No tengo datos sobre eso todavía 😅",
        "Aún estoy aprendiendo 🤖",
        "Ese tema no está en mi enciclopedia."
    ]);
}

function enviar(){
    let texto = input.value.trim();
    if(texto === "") return;

    agregarMensaje(texto, "user");
    input.value = "";

    setTimeout(()=>{
        agregarMensaje("Buscando información...", "bot");

        setTimeout(()=>{
            chat.removeChild(chat.lastChild);
            agregarMensaje(pensar(texto), "bot");
        }, 900);

    }, 400);
}

input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter") enviar();
});

