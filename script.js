// =========================================================
// Portafolio - Entrega 2
// Todo el código se ejecuta cuando el HTML terminó de cargar:
// $(function () { ... }) es la forma corta de jQuery para "documento listo".
// =========================================================
$(function () {

  // ---------------------------------------------------------
  // 1. MODO CLARO / OSCURO
  // Se guarda la preferencia en localStorage para recordarla
  // la próxima vez que se abra la página.
  // ---------------------------------------------------------
  const $html = $("html");
  const $btnTema = $("#btn-tema");

  function aplicarTema(tema) {
    $html.attr("data-theme", tema);
    const esOscuro = tema === "dark";
    $btnTema.find(".icono-tema").text(esOscuro ? "☀" : "☾");
    $btnTema.attr("aria-label", esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }

  // Tema inicial: el guardado, o si no existe, el del sistema operativo
  let temaGuardado = null;
  try { temaGuardado = localStorage.getItem("tema"); } catch (e) { /* sin almacenamiento */ }
  const prefiereClaro = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  aplicarTema(temaGuardado || (prefiereClaro ? "light" : "dark"));

  $btnTema.on("click", function () {
    const nuevo = $html.attr("data-theme") === "dark" ? "light" : "dark";
    aplicarTema(nuevo);
    try { localStorage.setItem("tema", nuevo); } catch (e) { /* sin almacenamiento */ }
  });

  // ---------------------------------------------------------
  // 2. MENÚ RESPONSIVE (botón hamburguesa)
  // ---------------------------------------------------------
  const $btnMenu = $("#btn-menu");
  const $enlaces = $("#enlaces");
  const esMovil = () => window.matchMedia("(max-width: 700px)").matches;

  $btnMenu.on("click", function () {
    const abierto = $btnMenu.attr("aria-expanded") === "true";
    $btnMenu.attr("aria-expanded", String(!abierto))
            .attr("aria-label", abierto ? "Abrir menú" : "Cerrar menú");
    $enlaces.stop().slideToggle(200); // animación de jQuery para desplegar
  });

  // Al elegir una opción en el celular, el menú se cierra solo
  $enlaces.on("click", "a", function () {
    if (esMovil()) {
      $enlaces.slideUp(200);
      $btnMenu.attr("aria-expanded", "false").attr("aria-label", "Abrir menú");
    }
  });

  // Si se agranda la ventana, se quita el estilo que dejó slideToggle
  $(window).on("resize", function () {
    if (!esMovil()) $enlaces.removeAttr("style");
  });

  // ---------------------------------------------------------
  // 3. ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE
  // Al hacer scroll se revisa qué sección está en pantalla
  // y se resalta su enlace en el menú.
  // ---------------------------------------------------------
  const $secciones = $("header[id], section[id]");
  const $btnArriba = $("#btn-arriba");

  function actualizarScroll() {
    const posicion = $(window).scrollTop() + 120;
    let actual = "inicio";

    $secciones.each(function () {
      if ($(this).offset().top <= posicion) actual = this.id;
    });

    // Si se llegó al final de la página, la última sección queda activa
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 4) {
      actual = $secciones.last().attr("id");
    }

    $enlaces.find("a").removeClass("activo").removeAttr("aria-current");
    $enlaces.find('a[href="#' + actual + '"]').addClass("activo").attr("aria-current", "true");

    // 4. BOTÓN "VOLVER ARRIBA": aparece después de bajar 400px
    $btnArriba.prop("hidden", $(window).scrollTop() < 400);
  }

  $(window).on("scroll", actualizarScroll);
  actualizarScroll();

  $btnArriba.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  // ---------------------------------------------------------
  // 5. FILTRO DE PROYECTOS POR TECNOLOGÍA
  // Cada botón tiene data-filtro y cada proyecto tiene data-tags.
  // ---------------------------------------------------------
  $(".filtro").on("click", function () {
    const filtro = $(this).data("filtro");

    $(".filtro").removeClass("activo").attr("aria-pressed", "false");
    $(this).addClass("activo").attr("aria-pressed", "true");

    let visibles = 0;
    $(".proyecto").each(function () {
      const tags = String($(this).data("tags")).split(" ");
      const coincide = filtro === "todos" || tags.includes(filtro);
      $(this).toggle(coincide);
      if (coincide) visibles++;
    });

    $("#sin-resultados").prop("hidden", visibles > 0);
  });

  // ---------------------------------------------------------
  // 6. VENTANA MODAL (reemplaza al alert() de la versión 1)
  // Lee los atributos data-* del botón y los pone en la ventana.
  // ---------------------------------------------------------
  const $modal = $("#modal");
  let ultimoBoton = null; // para devolver el foco al cerrar

  $(".btn-ver-proyecto").on("click", function () {
    ultimoBoton = this;
    const $b = $(this);

    $("#modal-titulo").text($b.data("titulo"));
    $("#modal-texto").text($b.data("detalle"));

    const enlace = $b.data("enlace");
    $("#modal-enlace").attr("href", enlace || "#").prop("hidden", !enlace);

    $modal.prop("hidden", false).hide().fadeIn(150);
    $modal.find(".modal-cerrar").trigger("focus");
  });

  function cerrarModal() {
    $modal.fadeOut(150, function () {
      $modal.prop("hidden", true).removeAttr("style");
      if (ultimoBoton) ultimoBoton.focus();
    });
  }

  $modal.on("click", ".modal-cerrar", cerrarModal);

  // Clic en el fondo oscuro (fuera de la caja) también cierra
  $modal.on("click", function (e) {
    if (e.target === this) cerrarModal();
  });

  // La tecla Escape cierra la ventana
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && !$modal.prop("hidden")) cerrarModal();
  });

  // ---------------------------------------------------------
  // 7. AVISO CORTO (toast)
  // ---------------------------------------------------------
  function mostrarAviso(texto) {
    $("#aviso").text(texto).stop(true, true).fadeIn(150).delay(2200).fadeOut(300);
  }

  // ---------------------------------------------------------
  // 8. COPIAR CORREO AL PORTAPAPELES
  // ---------------------------------------------------------
  $("#btn-copiar").on("click", function () {
    const correo = $("#correo").text();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(correo)
        .then(() => mostrarAviso("Correo copiado"))
        .catch(() => mostrarAviso("No se pudo copiar. Correo: " + correo));
    } else {
      mostrarAviso("Correo: " + correo);
    }
  });

  // ---------------------------------------------------------
  // 9. VALIDACIÓN DEL FORMULARIO EN TIEMPO REAL
  // Cada regla devuelve un mensaje de error o "" si está bien.
  // ---------------------------------------------------------
  const reglas = {
    nombre: function (v) {
      if (v.length === 0) return "Escribe tu nombre.";
      if (v.length < 3) return "El nombre debe tener al menos 3 letras.";
      return "";
    },
    email: function (v) {
      if (v.length === 0) return "Escribe tu correo.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "El correo debe tener la forma nombre@dominio.com.";
      return "";
    },
    mensaje: function (v) {
      if (v.length === 0) return "Escribe tu mensaje.";
      if (v.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      return "";
    }
  };

  function validarCampo($campo) {
    const id = $campo.attr("id");
    const error = reglas[id]($.trim($campo.val()));
    $("#error-" + id).text(error);
    $campo.closest(".campo").toggleClass("invalido", error !== "").toggleClass("valido", error === "");
    $campo.attr("aria-invalid", error !== "");
    return error === "";
  }

  // Se valida cuando la persona sale del campo, y después mientras escribe
  $("#form-contacto").on("blur", "input, textarea", function () {
    $(this).data("tocado", true);
    validarCampo($(this));
  });
  $("#form-contacto").on("input", "input, textarea", function () {
    if ($(this).data("tocado")) validarCampo($(this));
  });

  // Contador de caracteres del mensaje
  $("#mensaje").on("input", function () {
    $("#contador").text($(this).val().length);
  });

  $("#form-contacto").on("submit", function (e) {
    e.preventDefault(); // evita que la página se recargue

    let todoBien = true;
    $(this).find("input, textarea").each(function () {
      $(this).data("tocado", true);
      if (!validarCampo($(this))) todoBien = false;
    });

    if (!todoBien) {
      $(this).find(".invalido").first().find("input, textarea").trigger("focus");
      return;
    }

    // Como la página no tiene servidor, se abre el programa de correo con el mensaje listo
    const asunto = encodeURIComponent("Contacto desde el portafolio - " + $("#nombre").val());
    const cuerpo = encodeURIComponent($("#mensaje").val() + "\n\nResponder a: " + $("#email").val());
    window.location.href = "mailto:Areiza011@gmail.com?subject=" + asunto + "&body=" + cuerpo;

    mostrarAviso("Se abrió tu programa de correo con el mensaje");
    this.reset();
    $(this).find(".campo").removeClass("valido invalido");
    $(this).find("input, textarea").data("tocado", false);
    $("#contador").text("0");
  });
});
