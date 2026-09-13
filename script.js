// Busca en toda la página TODOS los elementos que tengan la clase "btn-ver-proyecto"
// (si agregas más proyectos con botones iguales, este código los encuentra a todos)
const botones = document.querySelectorAll(".btn-ver-proyecto");

// Recorre cada botón encontrado, uno por uno
botones.forEach((boton) => {

  // Le dice al navegador: "cuando este botón sea clickeado, ejecuta esta función"
  boton.addEventListener("click", () => {

    // Lee el texto guardado en el atributo personalizado data-detalle de ESE botón
    const detalle = boton.getAttribute("data-detalle");

    // Muestra ese texto en una ventana emergente
    alert(detalle);
  });
});