const fuerza = document.getElementById("fuerza");
const masa = document.getElementById("masa");
const tiempo = document.getElementById("tiempo");

const fuerzaVal = document.getElementById("fuerzaVal");
const masaVal = document.getElementById("masaVal");
const tiempoVal = document.getElementById("tiempoVal");

[fuerza, masa, tiempo].forEach(input => {
  input.addEventListener("input", () => {
    fuerzaVal.textContent = fuerza.value;
    masaVal.textContent = masa.value;
    tiempoVal.textContent = tiempo.value;
  });
});

function calcular() {
  let F = parseFloat(fuerza.value);
  let m = parseFloat(masa.value);
  let t = parseFloat(tiempo.value);

  let a = F / m;
  let v = a * t;
  let d = 0.5 * a * t * t;

  document.getElementById("resultado").innerHTML = `
    ⚡ Aceleración: ${a.toFixed(2)} m/s² <br>
    🚀 Velocidad: ${v.toFixed(2)} m/s <br>
    📏 Distancia: ${d.toFixed(2)} m
  `;

  animar(d, t);
  dibujarGrafica(a, t);
}

function animar(distancia, tiempo) {
  let obj = document.getElementById("objeto");

  obj.style.transition = "none";
  obj.style.left = "0px";

  setTimeout(() => {
    obj.style.transition = `left ${tiempo}s cubic-bezier(.25,.8,.25,1)`;
    obj.style.left = (distancia * 6) + "px";
  }, 50);
}

function dibujarGrafica(a, t) {
  const canvas = document.getElementById("grafica");
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();

  for (let x = 0; x <= t; x += 0.1) {
    let y = 0.5 * a * x * x;

    let px = (x / t) * canvas.width;
    let py = canvas.height - (y / (0.5 * a * t * t)) * canvas.height;

    ctx.lineTo(px, py);
  }

  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.stroke();
}