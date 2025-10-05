/*var container = document.querySelector(".text");

var speeds = {
   pause: 500, //Higher number = longer delay
   slow: 120,
   normal: 90,
   fast: 40,
   superFast: 10
};

var textLines = [
   { speed: speeds.slow, string: "Bienvenido, viajero!" },
   { speed: speeds.pause, string: "a", pause: true },
   { speed: speeds.normal, string: "astronautifantastico" },
   { speed: speeds.fast, string: "te dare una breve introduccion", classes: ["green"] },
   { speed: speeds.normal, string: "estas listo?" }
];


var characters = [];
textLines.forEach((line, index) => {
   if (index < textLines.length - 1) {
      line.string += " "; //Add a space between lines
   }

   line.string.split("").forEach((character) => {
      var span = document.createElement("span");
      span.textContent = character;
      container.appendChild(span);
      characters.push({
         span: span,
         isSpace: character === " " && !line.pause,
         delayAfter: line.speed,
         classes: line.classes || []
      });
   });
});

function revealOneCharacter(list) {
   var next = list.splice(0, 1)[0];
   next.span.classList.add("revealed");
   next.classes.forEach((c) => {
      next.span.classList.add(c);
   });
   var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

   if (list.length > 0) {
      setTimeout(function () {
         revealOneCharacter(list);
      }, delay);
   }
}

//Kick it off
setTimeout(() => {
   revealOneCharacter(characters);   
}, 600)*/

const container = document.querySelector(".text");
const prevBtn = document.querySelector(".nav-btn.prev");
const nextBtn = document.querySelector(".nav-btn.next");
const sceneIndicator = document.querySelector(".scene-indicator");

const speeds = {
    pause: 500,
    slow: 120,
    normal: 90,
    fast: 40,
    superFast: 10
};

// Definimos múltiples escenas de texto usando Map
const textScenes = new Map([
    [0, [
        { speed: speeds.slow, string: "¡Bienvenido, amigo Astronautifantástico! 🌟" },
        { speed: speeds.pause, string: "", pause: true },
        { speed: speeds.normal, string: "¡ALERTA DE MISIÓN!" },
        { speed: speeds.fast, string: "El Sol está en estado CRÍTICO y necesitamos tu ayuda URGENTE.", classes: ["green"] },
        { speed: speeds.normal, string: "¿Estás listo?" }
    ]],
    [1, [
        { speed: speeds.normal, string: "¿Qué está pasando?" },
        { speed: speeds.fast, string: "Nuestra estrella está liberando tormentas solares masivas que afectan la Tierra.", classes: ["blue"] },
        { speed: speeds.pause, string: "", pause: true },
        { speed: speeds.slow, string: "Auroras espectaculares, satélites en peligro, comunicaciones interrumpidas..." },
        { speed: speeds.fast, string: "¡y solo TÚ puedes ayudar!", classes: ["red"] },
    ]],
    [2, [
        { speed: speeds.fast, string: "Tu misión como METEORÓLOGO ESPACIAL Junior será usar herramientas científicas REALES de la NASA y NOAA para analizar:" },
        { speed: speeds.slow, string: "· Viento solar 🌬", classes: ["orange"] },
        { speed: speeds.slow, string: "· Fulguraciones solares 💥", classes: ["orange"] },
        { speed: speeds.slow, string: "· Eyecciones de masa coronal 🧭", classes: ["orange"] },
        { speed: speeds.slow, string: "· Manchas solares 🚦", classes: ["orange"] },
        { speed: speeds.pause, string: "", pause: true }
    ]],
    [3, [
        { speed: speeds.slow, string: "¿A quién salvarás?" },
        { speed: speeds.pause, string: "¿A quién salvarás?", pause: true },
        { speed: speeds.normal, string: "· Agricultores con tractores GPS" },
        { speed: speeds.normal, string: "· Astronautas en caminatas espaciales" },
        { speed: speeds.normal, string: "· Satélites inteligentes en órbita" },
]],
[4, [
        { speed: speeds.slow, string: "Cada decisión cuenta:" },
        { speed: speeds.pause, string: "", pause: true },
        { speed: speeds.normal, string: "¡Un consejo correcto los ayudará, uno incorrecto causa caos!" },
        { speed: speeds.normal, string: "¿Tienes lo que se necesita para dominar el clima solar y convertirte en un HÉROE ESTELAR?" },
        { speed: speeds.slow, string: "¡SÍ, ACEPTO EL DESAFÍO! 🚀", classes: ["green"] },
]]
]
);

let currentScene = -1;
let characters = [];
let revealTimeout;

// Función para cambiar de escena
function changeScene(direction) {
    // Limpiar timeout si existe
    if (revealTimeout) {
        clearTimeout(revealTimeout);
    }
    
    // Actualizar índice de escena
    if (direction === 'next') {
        if (currentScene < textScenes.size - 1) {
            currentScene++;
        } else {
            window.location.href = "../angel/sobres/index.html";
            return;
        }
    } else if (direction === 'prev' && currentScene > 0) {
        currentScene--;
    }
    
    // Actualizar estado de los botones
    updateButtons();
    
    // Actualizar indicador de escena
    sceneIndicator.textContent = `Escena ${currentScene + 1} de ${textScenes.size}`;
    
    // Limpiar el contenido actual
    const spans = container.querySelectorAll('span');
    spans.forEach(span => span.remove());
    
    // Reiniciar array de caracteres
    characters = [];
    
    // Obtener la escena actual del Map
    const currentSceneData = textScenes.get(currentScene);
    
    // Crear nuevos caracteres
    currentSceneData.forEach((line, index) => {
        if (index < currentSceneData.length - 1) {
            line.string += " "; // Añadir espacio entre líneas
        }
        
        line.string.split("").forEach((character) => {
            const span = document.createElement("span");
            span.textContent = character;
            container.appendChild(span); // Cambiado: ahora añade al final
            characters.push({
                span: span,
                isSpace: character === " " && !line.pause,
                delayAfter: line.speed,
                classes: line.classes || []
            });
        });
    });
    
    // Iniciar la animación
    revealTimeout = setTimeout(() => {
        revealOneCharacter(characters); // Cambiado: ya no necesita spread operator  
    }, 600);
}

function revealOneCharacter(list) {
    if (list.length === 0) return;
    
    const next = list.shift();
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    });
    
    const delay = next.isSpace ? 0 : next.delayAfter;
    
    if (list.length > 0) {
        revealTimeout = setTimeout(() => {
            revealOneCharacter(list);
        }, delay);
    }
}

function updateButtons() {
    prevBtn.disabled = currentScene === 0;
    // No deshabilitar el botón de siguiente en la última escena
    // nextBtn.disabled = currentScene === textScenes.size - 1;
}

// Añadir event listeners a los botones
prevBtn.addEventListener('click', () => changeScene('prev'));
nextBtn.addEventListener('click', () => changeScene('next'));

// Inicializar con la primera escena
changeScene('next');
