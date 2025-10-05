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
        { speed: speeds.slow, string: "¡Bienvenido, viajero!" },
        { speed: speeds.pause, string: "a", pause: true },
        { speed: speeds.normal, string: "AstronautiFantástico." },
        { speed: speeds.fast, string: "Te daré una breve introducción.", classes: ["green"] },
        { speed: speeds.normal, string: "¿Estás listo?" }
    ]],
    [1, [
        { speed: speeds.normal, string: "Este es un mundo lleno de" },
        { speed: speeds.fast, string: "maravillas", classes: ["blue"] },
        { speed: speeds.pause, string: "y", pause: true },
        { speed: speeds.slow, string: "misterios" },
        { speed: speeds.normal, string: "por descubrir." }
    ]],
    [2, [
        { speed: speeds.fast, string: "Tu nave está" },
        { speed: speeds.slow, string: "lista", classes: ["orange"] },
        { speed: speeds.pause, string: "para", pause: true },
        { speed: speeds.normal, string: "despegar!" },
        { speed: speeds.superFast, string: "¿A dónde quieres ir?", classes: ["purple"] }
    ]],
    [3, [
        { speed: speeds.slow, string: "Recuerda:" },
        { speed: speeds.pause, string: "el", pause: true },
        { speed: speeds.normal, string: "universo" },
        { speed: speeds.fast, string: "es", classes: ["red"] },
        { speed: speeds.normal, string: "infinito" },
        { speed: speeds.slow, string: "y lleno de posibilidades." }
    ]]
]);

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
    if (direction === 'next' && currentScene < textScenes.size - 1) {
        currentScene++;
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
    nextBtn.disabled = currentScene === textScenes.size - 1;
}

// Añadir event listeners a los botones
prevBtn.addEventListener('click', () => changeScene('prev'));
nextBtn.addEventListener('click', () => changeScene('next'));

// Inicializar con la primera escena
changeScene('next');