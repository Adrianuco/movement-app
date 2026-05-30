// MOVIMIENTO RECTILINEO UNIFORME ACELERADO

// Posicion Y del Objeto en caida libre
function mrua_y(y0, t) {
  return y0 - (1 / 2) * 9.8 * t ** 2;
}

function mrua_v(t, v1) {
  return v1 + 9.8 * t;
}

// MOVIMIENTO PARABOLICO

// Componente X del Vector
function mp_vx(v0, theta) {
  return v0 * Math.cos(theta);
}

// Componente Y del Vector
function mp_vy(v0, theta, t) {
  return v0 * Math.sin(theta) - 9.8 * t;
}

function mp_vy0(v0, theta) {
  return v0 * Math.sin(theta);
}
// Posicion Horizontal del Proyectil
function mp_x(x0, Vx, t) {
  return x0 + Vx * t;
}

// Posicion Vertical del Proyectil
function mp_y(y0, v0, theta, t) {
  return y0 + v0 * Math.sin(theta) * t - (1 / 2) * 9.8 * t ** 2;
}

// Angulo del proyectil
function theta(h1, h2, d) {
  return Math.atan((h2 - h1) / d);
}

function trayectoria(theta, x, v0, y0) {
  return (
    y0 +
    x * Math.tan(theta) -
    (9.8 / (2 * v0 ** 2 * Math.cos(theta) ** 2)) * x ** 2
  );
}
