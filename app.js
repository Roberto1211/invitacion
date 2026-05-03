const modal = document.getElementById("modal");
const qrContainer = document.getElementById("qr-container");
const formContainer = document.getElementById("form-container");

const params = new URLSearchParams(window.location.search);
const invitados = params.get("invitados");

let qrGenerado = false;
let qrInstance = null;
const qrAcciones = document.getElementById("qr-acciones");

function abrirModal() {
  modal.classList.remove("hidden");
}

function cerrarModal() {
  modal.classList.add("hidden");

  const qrElement = document.getElementById("qrcode");
  const ctx = qrElement.getContext("2d");
  ctx.clearRect(0, 0, qrElement.width, qrElement.height);

  qrInstance = null;
  qrGenerado = false;

  qrContainer.classList.add("hidden");

  qrAcciones.classList.add("hidden"); 
  formContainer.classList.remove("hidden");

  document.getElementById("nombre").value = "";
}

function generarQR() {
  if (qrGenerado) return;
  const nombre = document.getElementById("nombre").value;

  if (!nombre) {
    alert("Ingresa tu nombre");
    return;
  }

  const data = {
    nombre,
    invitados
  };
  const qrElement = document.getElementById("qrcode");

  formContainer.classList.add("hidden");
  qrContainer.classList.remove("hidden");

  new QRious({
    element: qrElement,
    value: JSON.stringify(data),
    size: 200
  });

  qrAcciones.classList.remove("hidden");
  qrGenerado = true;
}

function descargarQR() {
  const canvas = document.getElementById("qrcode");

  const link = document.createElement("a");
  link.download = "qr-invitacion.png";
  link.href = canvas.toDataURL("image/png");

  link.click();
}