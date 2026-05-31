class Proyectil {
  constructor(x0, y0, v0, theta) {
    // Condiciones iniciales
    this.x0 = x0;
    this.y0 = y0;
    this.v0 = v0;
    this.theta = theta;

    // Componentes iniciales
    this.vx = mp_vx(v0, theta);
    this.vy = mp_vy(v0, theta, 0);

    // Estado actual
    this.x = x0;
    this.y = y0;

    // Tiempo interno
    this.t = 0;
  }

  actualizar(dt) {
    // Avanzar tiempo
    this.t += dt;

    // Actualizar velocidades
    this.vy = mp_vy(this.v0, this.theta, this.t);

    // Actualizar posiciones
    this.x = mp_x(this.x0, this.vx, this.t);

    this.y = mp_y(this.y0, this.v0, this.theta, this.t);
  }
}

class Objetivo {
  constructor(x0, y0) {
    // Posición inicial
    this.x = x0;
    this.y0 = y0;

    // Estado actual
    this.y = y0;

    // Tiempo interno
    this.t = 0;
  }

  actualizar(dt) {
    // Avanzar tiempo
    this.t += dt;

    // Caída libre
    this.y = mrua_y(this.y0, this.t);
  }
}

class Entorno {
  constructor() {
    this.dt = 0.016;
    this.t = 0;
    this.pausado = true;
  }

  actualizar() {
    if (!this.pausado) {
      this.t += this.dt;
    }
  }
}
