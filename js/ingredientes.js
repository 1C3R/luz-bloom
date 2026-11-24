/*
 * Fichas de información general sobre ingredientes y elaboración.
 */

(() => {
    const botones = document.querySelectorAll("[data-ingredientes]");
    const visor = document.querySelector("#visor-ingredientes");
    const titulo = document.querySelector("#titulo-ficha-ingredientes");
    const contenido = document.querySelector("#contenido-ficha-ingredientes");

    if (!visor || !titulo || !contenido) {
        return;
    }

    let botonOrigen = null;

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const plantilla = document.getElementById(
                boton.dataset.ingredientes
            );

            if (!plantilla || visor.open) {
                return;
            }

            botonOrigen = boton;
            titulo.textContent = boton.textContent.trim();

            contenido.replaceChildren(
                plantilla.content.cloneNode(true)
            );

            visor.showModal();
            visor.scrollTop = 0;
            titulo.focus({ preventScroll: true });
        });
    });

    // Cualquier clic en la ficha o en el fondo cierra el visor.
    visor.addEventListener("click", () => {
        visor.close();
    });

    visor.addEventListener("close", () => {
        if (botonOrigen?.isConnected) {
            botonOrigen.focus({ preventScroll: true });
        }

        botonOrigen = null;
    });
})();