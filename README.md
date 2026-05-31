# Movement App

> Simulación interactiva del experimento clásico de la bola y el mono, desarrollada con JavaScript y p5.js para visualizar y analizar el movimiento parabólico y la caída libre.

JavaScript
p5.js
Physics

---

## 📖 Descripción

Este proyecto implementa una simulación del experimento conocido como "Monkey and Hunter", utilizado en física para demostrar que dos objetos sometidos a la misma aceleración gravitatoria experimentan la misma caída vertical independientemente de su movimiento horizontal.

La simulación permite:

- Configurar la posición inicial del proyectil.
- Configurar la posición inicial del objetivo.
- Definir la velocidad inicial del proyectil.
- Visualizar la trayectoria parabólica del proyectil.
- Visualizar la caída libre del objetivo.
- Detectar colisiones mediante una tolerancia de distancia configurable.
- Escalar automáticamente la vista para mantener visibles ambos objetos dentro del canvas.

---

## 🎯 Objetivo del Proyecto

Demostrar mediante simulación computacional los principios de:

- Movimiento parabólico.
- Movimiento rectilíneo uniformemente acelerado (MRUA).
- Descomposición vectorial de velocidades.
- Influencia de la gravedad sobre distintos cuerpos.
- Detección de colisiones basada en distancia euclidiana.

---

## ⚙️ Tecnologías Utilizadas

### Lenguaje

- JavaScript
- HTML
- CSS

### Librerías

- p5.js

### Herramientas

- Visual Studio Code
- GitHub

---

## 🧠 Fundamento Físico

### Movimiento Parabólico

Componente horizontal:

vx = v0 · cos(θ)

Posición horizontal:

x(t) = x0 + vx · t

---

Componente vertical:

vy(t) = v0 · sin(θ) - g · t

Posición vertical:

y(t) = y0 + vy₀ · t - ½gt²

---

### Caída Libre

Posición vertical del objetivo:

y(t) = y0 - ½gt²

---

### Ángulo de Disparo

θ = arctan((yobjetivo - yproyectil) / distancia)

---

### Detección de Colisión

La distancia entre ambos objetos se calcula mediante:

d = √[(x₂ - x₁)² + (y₂ - y₁)²]

Si:

d < margen de tolerancia ingresado

se considera que ocurrió una colisión.

---

## 🏗️ Estructura del Proyecto

text project/ │ ├── index.html │ ├── scripts/ │   ├── physics.js │   ├── objects.js │   └── sketch.js │ ├── styles/ │   └── style.css │ └── README.md 

### physics.js

Contiene las funciones matemáticas y físicas utilizadas por la simulación:

- Movimiento parabólico
- Caída libre
- Cálculo de ángulo
- Conversión de posiciones

### objects.js

Define las clases principales:

- Proyectil
- Objetivo
- Entorno

Cada objeto administra su propio estado y evolución temporal.

### sketch.js

Controla:

- Renderizado del canvas
- Interacción con el usuario
- Actualización de la simulación
- Detección de colisiones
- Escalado automático

---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Clonar el repositorio

bash git clone <url-del-repositorio> 

### 2. Abrir el proyecto

bash cd <nombre-del-proyecto> 

### 3. Iniciar un servidor local

Ejemplo usando VS Code:

- Instalar la extensión Live Server.
- Abrir index.html.
- Seleccionar Open with Live Server.

---

## 🎮 Uso

1. Introducir las coordenadas iniciales del proyectil.
2. Introducir las coordenadas iniciales del objetivo.
3. Definir la velocidad inicial.
4. Definir el margen de tolerancia.
5. Presionar Aplicar.
6. Observar la simulación.
7. Hacer clic sobre el canvas para pausar o reanudar.

---

## 📊 Características Implementadas

- [x] Movimiento parabólico.
- [x] Caída libre.
- [x] Ángulo calculado automáticamente.
- [x] Sistema de clases.
- [x] Escalado dinámico.
- [x] Plano cartesiano.
- [x] Detección de colisiones.
- [x] Temporizador de simulación.
- [x] Interfaz interactiva.

---

## 📚 Referencias

- Documentación oficial de p5.js

---

## 👨‍💻 Autores

- Adriano Almanza
- Denis Gabriel
- Yader García
  
Desarrollado como proyecto académico para la asignatura de Física Aplicada.

