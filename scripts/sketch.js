// Variables Gloables
let entorno;
let proyectil;
let objetivo;
let x0, y0, v0, objetivoX, objetivoY, toleranciaColision;

let pixelsPerMeter = 60;

// Conversión de unidades
function metersToPixels(value) {
  return value * pixelsPerMeter;
}

// Funcion para actualizar en pantalla las posiciones del proyectil y el objetivo
function updatePositionCards() {
  const proyectilPosition = document.getElementById("proyectil-position");
  const objetivoPosition = document.getElementById("objetivo-position");

  if (proyectil) {
    proyectilPosition.textContent = `X: ${Math.round(proyectil.x)} m | Y: ${Math.round(proyectil.y)} m`;
  } else {
    proyectilPosition.textContent = `X: 0 m | Y: 0 m`;
  }

  if (objetivo) {
    objetivoPosition.textContent = `X: ${Math.round(objetivo.x)} m | Y: ${Math.round(objetivo.y)} m`;
  } else {
    objetivoPosition.textContent = `X: 0 m | Y: 0 m`;
  }
}

// Funcion para restablecer la simulación a su estado inicial
function restablecerSimulacion() {
  entorno = null;
  proyectil = null;
  objetivo = null;
  x0 = y0 = v0 = objetivoX = objetivoY = toleranciaColision = null;

  const divTiempo = document.getElementsByClassName("card-tiempo");
  divTiempo[0].textContent = `Tiempo: 0.00s`;
  document.getElementById("collision-message").classList.add("hidden");
  updatePositionCards();
  document.getElementsByTagName("form")[0].reset();
}

// Funcion para iniciar la simulación con los parámetros ingresados por el usuario
function iniciarSimulacion() {
  // Leer parámetros del formulario
  x0 = document.getElementById("proyectilX").valueAsNumber;
  y0 = document.getElementById("proyectilY").valueAsNumber;
  objetivoX = document.getElementById("objetivoX").valueAsNumber;
  objetivoY = document.getElementById("objetivoY").valueAsNumber;
  v0 = document.getElementById("proyectilV").valueAsNumber;
  toleranciaColision =
    document.getElementById("toleranciaColision").valueAsNumber;

  document.getElementById("collision-message").classList.add("hidden");

  // Calcular la escala de píxeles por metro para ajustar el canvas a los parámetros ingresados
  const maxX = Math.max(x0, objetivoX);
  const maxY = Math.max(y0, objetivoY);
  const escalaX = width / maxX;
  const escalaY = height / maxY;

  pixelsPerMeter = Math.min(escalaX, escalaY);

  // Se instancian los objetos con los parámetros ingresados
  entorno = new Entorno();
  const angulo = theta(y0, objetivoY, objetivoX - x0);
  proyectil = new Proyectil(x0, y0, v0, angulo);
  objetivo = new Objetivo(objetivoX, objetivoY);

  // Actualizar las posiciones en pantalla y comenzar la simulación
  updatePositionCards();
  entorno.pausado = false;
}

// Función de configuración inicial de p5.js
function setup() {
  // Se crea el canvas y se le agrega estilo
  const canvas = createCanvas(1000, 600);
  canvas.parent("canvas-container");
  canvas.elt.style.border = "2px solid #ccc";
  canvas.elt.style.borderRadius = "8px";

  // Evento para el botón de iniciar simulación
  const btnAplicar = document.getElementById("btnAplicar");
  btnAplicar.addEventListener("click", () => {
    iniciarSimulacion();
  });

  // Evento para el botón de restablecer simulación
  const btnRestablecer = document.getElementById("btnRestablecer");
  btnRestablecer.addEventListener("click", () => {
    restablecerSimulacion();
  });

  // Evento para pausar/reanudar la simulación al hacer clic en el canvas
  const divPause = document.getElementById("canvas-container");
  divPause.addEventListener("click", () => {
    if (objetivo.colision) {
      objetivo.colision = false;
      document.getElementById("collision-message").classList.add("hidden");
    }
    entorno.pausado = !entorno.pausado;
  });
}

// Funcion para dibujar la cuadrícula
function drawGrid() {
  stroke(50);

  // Líneas verticales cada metro
  for (let x = 0; x <= width; x += pixelsPerMeter) {
    line(x, 0, x, height);
  }

  // Líneas horizontales cada metro
  for (let y = 0; y <= height; y += pixelsPerMeter) {
    line(0, y, width, y);
  }
}

// Funcion principal de dibujo de p5.js
function draw() {
  // Si no se ha iniciado la simulación, solo se dibuja la cuadrícula y el fondo
  if (!entorno) {
    background(20);
    drawGrid();
    return;
  }

  // Dibujar fondo y cuadrícula
  background(20);
  drawGrid();

  // Actualizar tiempo en pantalla
  const divTiempo = document.getElementsByClassName("card-tiempo");
  divTiempo[0].textContent = `Tiempo: ${entorno.t.toFixed(2)}s`;

  // Si la simulación no está pausada, se actualizan las posiciones del proyectil y el objetivo, y se verifica colisión
  if (!entorno.pausado) {
    entorno.actualizar();
    proyectil.actualizar(entorno.dt);
    objetivo.actualizar(entorno.dt);

    objetivo.checkColision(proyectil, toleranciaColision);

    // En caso de colision, se muestra el mensaje de colisión y se pausa la simulación
    if (objetivo.colision) {
      document.getElementById("collision-message").classList.remove("hidden");
      entorno.pausado = true;
      return;
    }
  }

  // Actualizar las posiciones en pantalla
  updatePositionCards();

  // Se dibujan el proyectil y el objetivo en el canvas, convirtiendo sus posiciones de metros a píxeles
  fill(255, 120, 120);

  circle(metersToPixels(proyectil.x), height - metersToPixels(proyectil.y), 10);

  fill(120, 200, 255);

  circle(metersToPixels(objetivo.x), height - metersToPixels(objetivo.y), 10);
}
