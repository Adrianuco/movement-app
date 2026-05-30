// sketch.js

let entorno;
let proyectil;
let objetivo;

const PIXELS_PER_METER = 60;

function metersToPixels(value) {
  return value * PIXELS_PER_METER;
}

function setup() {
  createCanvas(1000, 600);

  // Crear entorno
  entorno = new Entorno();

  const x0 = 0;
  const y0 = 200;

  const objetivoX = 50;
  const objetivoY = 60;

  const v0 = 20;

  // Calcular ángulo automáticamente
  const angulo = theta(y0, objetivoY, objetivoX - x0);

  proyectil = new Proyectil(x0, y0, v0, angulo);

  objetivo = new Objetivo(objetivoX, objetivoY);
}

function draw() {
  background(20);

  entorno.actualizar();

  proyectil.actualizar(entorno.dt);

  objetivo.actualizar(entorno.dt);

  fill(255, 120, 120);

  circle(metersToPixels(proyectil.x), height - metersToPixels(proyectil.y), 10);

  fill(120, 200, 255);

  circle(metersToPixels(objetivo.x), height - metersToPixels(objetivo.y), 10);
}
