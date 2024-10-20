// Selecciona la frase que quieras
const fraseOriginal = "la gran subasta de los horrores".toLowerCase();
let fraseOculta = fraseOriginal.replace(/[a-záéíóúñ]/gi, "_"); // Oculta la frase
let intentosRestantes = 6;
let letrasAdivinadas = [];

const fraseOcultaElemento = document.getElementById('frase-oculta');
const inputLetra = document.getElementById('input-letra');
const botonAdivinar = document.getElementById('boton-adivinar');
const mensajeElemento = document.getElementById('mensaje');
const intentosRestantesElemento = document.getElementById('intentos-restantes');
const canvas = document.getElementById('ahorcado-canvas');
const ctx = canvas.getContext('2d');

fraseOcultaElemento.innerHTML = fraseOculta;

// Función para verificar la letra ingresada
botonAdivinar.addEventListener('click', () => {
  const letra = inputLetra.value.toLowerCase();
  inputLetra.value = '';  // Limpia el input

  if (letra === '' || letrasAdivinadas.includes(letra)) {
    mensajeElemento.textContent = 'Introduce una letra válida que no hayas usado';
    return;
  }

  letrasAdivinadas.push(letra);

  // Actualiza la frase oculta si la letra está en la frase original
  if (fraseOriginal.includes(letra)) {
    fraseOculta = actualizarFraseOculta(letra, fraseOriginal, fraseOculta);
    fraseOcultaElemento.innerHTML = fraseOculta;
    mensajeElemento.textContent = '';

    if (!fraseOculta.includes('_')) {
      mensajeElemento.textContent = '¡Felicidades, ganaste!';
      const urlFormulario = "https://docs.google.com/forms/d/e/1FAIpQLScf5PGV71jePkQuzRvKMDaJSvzxQpt0VgkzGjpPiYZ2asEAHQ/viewform?usp=sf_link";
        window.open(urlFormulario, '_blank');
      botonAdivinar.disabled = true;
    }
  } else {
    intentosRestantes--;
    intentosRestantesElemento.textContent = intentosRestantes;
    dibujarAhorcado();

    if (intentosRestantes === 0) {
      mensajeElemento.textContent = '¡Perdiste! Recarga e inténtalo de nuevo ';
      botonAdivinar.disabled = true;
    }
  }
});

// Función para actualizar la frase oculta con las letras adivinadas
function actualizarFraseOculta(letra, fraseOriginal, fraseOculta) {
  let nuevaFraseOculta = '';
  for (let i = 0; i < fraseOriginal.length; i++) {
    if (fraseOriginal[i] === letra) {
      nuevaFraseOculta += letra;
    } else {
      nuevaFraseOculta += fraseOculta[i];
    }
  }
  return nuevaFraseOculta;
}

// Función para dibujar el ahorcado en el canvas
function dibujarAhorcado() {
  switch (intentosRestantes) {
    case 5:
      // Cabeza
      ctx.beginPath();
      ctx.arc(100, 50, 20, 0, Math.PI * 2, true);
      ctx.stroke();
      break;
    case 4:
      // Cuerpo
      ctx.moveTo(100, 70);
      ctx.lineTo(100, 120);
      ctx.stroke();
      break;
    case 3:
      // Brazo izquierdo
      ctx.moveTo(100, 90);
      ctx.lineTo(80, 110);
      ctx.stroke();
      break;
    case 2:
      // Brazo derecho
      ctx.moveTo(100, 90);
      ctx.lineTo(120, 110);
      ctx.stroke();
      break;
    case 1:
      // Pierna izquierda
      ctx.moveTo(100, 120);
      ctx.lineTo(80, 150);
      ctx.stroke();
      break;
    case 0:
      // Pierna derecha
      ctx.moveTo(100, 120);
      ctx.lineTo(120, 150);
      ctx.stroke();
      break;
  }
}