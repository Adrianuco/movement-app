// sketch.js

let entorno;
let proyectil;
let objetivo;
let x0, y0, v0, objetivoX, objetivoY, toleranciaColision;

const PIXELS_PER_METER = 60;

function metersToPixels(value) {
  return value * PIXELS_PER_METER;
}

function restablecerSimulacion() {
  entorno = null;
  proyectil = null;
  objetivo = null;
  x0 = y0 = v0 = objetivoX = objetivoY = toleranciaColision = null;

  const divTiempo = document.getElementsByClassName("card-tiempo");
  divTiempo[0].textContent = `Tiempo: 0.00s`;
  document.getElementsByTagName("form")[0].reset();
}

function iniciarSimulacion() {
  console.log("Iniciando simulación...");
  x0 = document.getElementById("proyectilX").valueAsNumber;
  y0 = document.getElementById("proyectilY").valueAsNumber;

  objetivoX = document.getElementById("objetivoX").valueAsNumber;
  objetivoY = document.getElementById("objetivoY").valueAsNumber;

  v0 = document.getElementById("proyectilV").valueAsNumber;
  toleranciaColision =
    document.getElementById("toleranciaColision").valueAsNumber;

  entorno = new Entorno();

  const angulo = theta(y0, objetivoY, objetivoX - x0);

  proyectil = new Proyectil(x0, y0, v0, angulo);

  objetivo = new Objetivo(objetivoX, objetivoY);

  entorno.pausado = false;
  console.log("Simulación iniciada con parámetros:");
}

function setup() {
  const canvas = createCanvas(1000, 600);

  canvas.parent("canvas-container");
  canvas.elt.style.border = "2px solid #ccc";
  canvas.elt.style.borderRadius = "8px";

  const btnAplicar = document.getElementById("btnAplicar");
  btnAplicar.addEventListener("click", () => {
    iniciarSimulacion();
  });

  const btnRestablecer = document.getElementById("btnRestablecer");
  btnRestablecer.addEventListener("click", () => {
    restablecerSimulacion();
  });
  const divPause = document.getElementById("canvas-container");

  divPause.addEventListener("click", () => {
    entorno.pausado = !entorno.pausado;
  });
}

function drawGrid() {
  stroke(50);

  // Líneas verticales cada metro
  for (let x = 0; x <= width; x += PIXELS_PER_METER) {
    line(x, 0, x, height);
  }

  // Líneas horizontales cada metro
  for (let y = 0; y <= height; y += PIXELS_PER_METER) {
    line(0, y, width, y);
  }
}

function draw() {
  if (!entorno) {
    background(20);
    drawGrid();
    return;
  }
  background(20);

  drawGrid();
  console.log("inicio del draw");
  const divTiempo = document.getElementsByClassName("card-tiempo");
  divTiempo[0].textContent = `Tiempo: ${entorno.t.toFixed(2)}s`;

  if (!entorno.pausado) {
    entorno.actualizar();

    proyectil.actualizar(entorno.dt);
    objetivo.actualizar(entorno.dt);
    objetivo.checkColision(proyectil, toleranciaColision);
    if (objetivo.colision) {
      console.log("Colision!");
      entorno.pausado = true;
      return;
    }
  }

  fill(255, 120, 120);

  circle(metersToPixels(proyectil.x), height - metersToPixels(proyectil.y), 10);

  fill(120, 200, 255);

  circle(metersToPixels(objetivo.x), height - metersToPixels(objetivo.y), 10);
}
