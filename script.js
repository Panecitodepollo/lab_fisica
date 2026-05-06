// ===============================
// SIMULADOR NEWTON DESDE CERO
// ===============================

// Inputs
const fuerza = document.getElementById("fuerza");
const masa = document.getElementById("masa");
const tiempo = document.getElementById("tiempo");

// Labels
const fuerzaVal = document.getElementById("fuerzaVal");
const masaVal = document.getElementById("masaVal");
const tiempoVal = document.getElementById("tiempoVal");

// Resultado
const resultado = document.getElementById("resultado");

// Elementos visuales
const objeto = document.getElementById("objeto");
const escenario = document.querySelector(".escenario");


// ===============================
// ACTUALIZAR VALORES
// ===============================
function actualizarValores() {
  fuerzaVal.textContent = fuerza.value;
  masaVal.textContent = masa.value;
  tiempoVal.textContent = tiempo.value;
}

[fuerza, masa, tiempo].forEach(input => {
  input.addEventListener("input", actualizarValores);
});


// ===============================
// FUNCIÓN PRINCIPAL
// ===============================
function calcular() {

  const F = Number(fuerza.value);
  const m = Number(masa.value);
  const t = Number(tiempo.value);

  if (m === 0) {
    resultado.innerHTML = "⚠️ La masa no puede ser 0";
    return;
  }

  // Física
  const a = F / m;
  const v = a * t;
  const d = 0.5 * a * t * t;

  // ===============================
  // RESPUESTAS
  // ===============================
  resultado.innerHTML = `
    <div class="bloque">
      <p class="pregunta">1. ¿Cuál es la aceleración?</p>
      <p class="respuesta">${a.toFixed(2)} m/s²</p>
    </div>

    <div class="bloque">
      <p class="pregunta">2. ¿Qué velocidad alcanza?</p>
      <p class="respuesta">${v.toFixed(2)} m/s</p>
    </div>

    <div class="bloque">
      <p class="pregunta">3. ¿Qué distancia recorre?</p>
      <p class="respuesta">${d.toFixed(2)} m</p>
    </div>
  `;

  moverObjeto(d, t);
}


// ===============================
// ANIMACIÓN CON LÍMITE
// ===============================
function moverObjeto(distancia, tiempo) {

  // Reset
  objeto.style.transition = "none";
  objeto.style.left = "0px";

  setTimeout(() => {

    // Tamaños reales
    const anchoEscenario = escenario.clientWidth;
    const anchoObjeto = objeto.clientWidth;

    // Espacio máximo disponible
    const limite = anchoEscenario - anchoObjeto;

    // Escala visual (ajustable)
    const escala = 6;

    // Distancia convertida a pixeles
    let desplazamiento = distancia * escala;

    // 🔥 AQUÍ ESTÁ EL LÍMITE REAL
    if (desplazamiento > limite) {
      desplazamiento = limite;
    }

    // Animación
    objeto.style.transition = `left ${tiempo}s ease-out`;
    objeto.style.left = desplazamiento + "px";

  }, 50);
}