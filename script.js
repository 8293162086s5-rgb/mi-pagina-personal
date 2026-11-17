const TELEFONO = "829-716-2871";
const WHATSAPP = "18297162871";

// 1. Frase aleatoria en el encabezado
const frases = [
  "Todo gran proyecto empieza con una línea de código.",
  "Aprender hoy, construir mañana.",
  "La práctica constante hace al programador.",
  "Resolver problemas es mi mejor herramienta."
];
document.getElementById("frase").textContent =
  frases[Math.floor(Math.random() * frases.length)];

// 2. Botón "Leer más" / "Leer menos"
const btnMas = document.getElementById("btnMas");
const masInfo = document.getElementById("masInfo");
btnMas.addEventListener("click", () => {
  const visible = masInfo.classList.toggle("visible");
  btnMas.textContent = visible ? "Leer menos" : "Leer más";
});

// 3. Modo oscuro (se recuerda la preferencia)
const btnTema = document.getElementById("btnTema");
function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  btnTema.textContent = oscuro ? "☀️ Claro" : "🌙 Oscuro";
}
try { aplicarTema(localStorage.getItem("tema") === "oscuro"); } catch (e) {}
btnTema.addEventListener("click", () => {
  const oscuro = !document.body.classList.contains("oscuro");
  aplicarTema(oscuro);
  try { localStorage.setItem("tema", oscuro ? "oscuro" : "claro"); } catch (e) {}
});

// 4. Menú desplegable en móvil
const btnMenu = document.getElementById("btnMenu");
const listaMenu = document.getElementById("listaMenu");
btnMenu.addEventListener("click", () => {
  const abierto = listaMenu.classList.toggle("abierto");
  btnMenu.setAttribute("aria-expanded", abierto);
});
listaMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    listaMenu.classList.remove("abierto");
    btnMenu.setAttribute("aria-expanded", "false");
  })
);

// 5. Filtro de la tabla de habilidades
const filtros = document.querySelectorAll(".filtro");
const filas = document.querySelectorAll("#habilidades tbody tr");
filtros.forEach((f) =>
  f.addEventListener("click", () => {
    filtros.forEach((x) => x.classList.remove("activo"));
    f.classList.add("activo");
    const tipo = f.dataset.filtro;
    filas.forEach((fila) => {
      fila.style.display = tipo === "todas" || fila.dataset.tipo === tipo ? "" : "none";
    });
  })
);

// 6. Copiar teléfono e imprimir
document.getElementById("btnCopiar").addEventListener("click", (e) => {
  const btn = e.currentTarget;
  const original = btn.textContent;
  const listo = () => {
    btn.textContent = "✅ Copiado";
    setTimeout(() => (btn.textContent = original), 1500);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(TELEFONO).then(listo).catch(() => {});
  }
});
document.getElementById("btnImprimir").addEventListener("click", () => window.print());

// 7. Validación del formulario y envío por WhatsApp
const form = document.getElementById("formContacto");
const respuesta = document.getElementById("respuesta");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const campos = [
    document.getElementById("nombre"),
    document.getElementById("correo"),
    document.getElementById("mensaje")
  ];
  let valido = true;

  campos.forEach((c) => {
    const vacio = c.value.trim() === "";
    c.classList.toggle("error", vacio);
    if (vacio) valido = false;
  });

  const correo = campos[1];
  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo.value.trim() !== "" && !formatoCorreo.test(correo.value)) {
    correo.classList.add("error");
    valido = false;
  }

  if (valido) {
    const texto =
      "Hola, soy " + campos[0].value.trim() +
      " (" + campos[1].value.trim() + "). " + campos[2].value.trim();
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank");
    respuesta.textContent = "¡Gracias, " + campos[0].value.trim() + "! Se abrió WhatsApp con tu mensaje.";
    respuesta.className = "ok";
    form.reset();
  } else {
    respuesta.textContent = "Por favor completa todos los campos con datos válidos.";
    respuesta.className = "fallo";
  }
});
