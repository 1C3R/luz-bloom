(() => {
    const deposito = document.querySelector("#fichas-velas");
    const tarjetas = document.querySelector("#tarjetas-velas");
    const plantilla = document.querySelector("#plantilla-vela");
    const paginacion = document.querySelector("#paginacion-velas");
    const anterior = document.querySelector("#pagina-anterior");
    const siguiente = document.querySelector("#pagina-siguiente");
    const numeroPagina = document.querySelector("#numero-pagina");
    const visor = document.querySelector("#visor-vela");
    const fotoVisor = document.querySelector("#foto-visor");

    if (
        !deposito ||
        !tarjetas ||
        !plantilla ||
        !paginacion ||
        !anterior ||
        !siguiente ||
        !numeroPagina ||
        !visor ||
        !fotoVisor
    ) {
        return;
    }

    const productos = [...deposito.querySelectorAll(".vela-ficha")].map(ficha => {
        const nombre = ficha.querySelector("h3").textContent.trim();
        const imagenes = [...ficha.querySelectorAll("img")];

        const fotos = [...new Map(imagenes.map(imagen => [
            imagen.src,
            {
                src: imagen.src,
                alt: imagen.alt || nombre
            }
        ])).values()];

        imagenes.forEach(imagen => imagen.remove());

        return { ficha, nombre, fotos };
    });

    const paginar = productos.length >= 20;
    const porPagina = paginar ? 12 : Math.max(1, productos.length);
    const totalPaginas = Math.max(1, Math.ceil(productos.length / porPagina));
    const tarjetasVisibles = new Map();

    let pagina = 0;
    let activa = null;
    let datosZoom = null;

    // Controles del visor compartido.
    const anteriorZoom = document.createElement("button");
    anteriorZoom.type = "button";
    anteriorZoom.className = "visor-flecha visor-anterior";
    anteriorZoom.textContent = "‹";
    anteriorZoom.setAttribute("aria-label", "Fotografía anterior");
    anteriorZoom.setAttribute("aria-controls", "foto-visor");

    const siguienteZoom = document.createElement("button");
    siguienteZoom.type = "button";
    siguienteZoom.className = "visor-flecha visor-siguiente";
    siguienteZoom.textContent = "›";
    siguienteZoom.setAttribute("aria-label", "Fotografía siguiente");
    siguienteZoom.setAttribute("aria-controls", "foto-visor");

    visor.append(anteriorZoom, siguienteZoom);

    function actualizarAccionFoto(datos) {
        const { producto, botonFoto, fotoActual } = datos;

        if (activa === datos) {
            botonFoto.setAttribute(
                "aria-label",
                "Ampliar foto " + (fotoActual + 1) + " de " + producto.nombre
            );
            botonFoto.setAttribute("aria-haspopup", "dialog");
            botonFoto.setAttribute("aria-controls", "visor-vela");
        } else {
            botonFoto.setAttribute(
                "aria-label",
                "Ver ficha de " + producto.nombre
            );
            botonFoto.removeAttribute("aria-haspopup");
            botonFoto.setAttribute("aria-controls", producto.ficha.id);
        }
    }

    function cerrarFicha() {
        if (!activa) {
            return;
        }

        const datos = activa;
        const { producto, tarjeta, ver, miniaturas } = datos;

        deposito.append(producto.ficha);
        tarjeta.classList.remove("vela-abierta");
        ver.setAttribute("aria-expanded", "false");
        miniaturas.hidden = true;

        activa = null;
        actualizarAccionFoto(datos);
    }

    function abrirFicha(datos) {
        if (activa === datos) {
            return;
        }

        cerrarFicha();

        const { producto, tarjeta, ver, miniaturas } = datos;

        tarjeta.classList.add("vela-abierta");
        tarjeta.append(producto.ficha);
        ver.setAttribute("aria-expanded", "true");
        miniaturas.hidden = producto.fotos.length < 2;

        activa = datos;
        actualizarAccionFoto(datos);

        const titulo = producto.ficha.querySelector("h3");
        titulo.focus({ preventScroll: true });
        titulo.scrollIntoView({ block: "nearest" });
    }

    function actualizarZoom() {
        if (!datosZoom) {
            return;
        }

        const { producto, fotoActual } = datosZoom;
        const foto = producto.fotos[fotoActual];

        fotoVisor.src = foto.src;
        fotoVisor.alt = foto.alt;

        visor.setAttribute(
            "aria-label",
            producto.nombre +
            ". Fotografía " +
            (fotoActual + 1) +
            " de " +
            producto.fotos.length
        );

        anteriorZoom.hidden = producto.fotos.length < 2;
        siguienteZoom.hidden = producto.fotos.length < 2;
    }

    function abrirZoom(datos) {
        datosZoom = datos;
        actualizarZoom();
        visor.showModal();
    }

    function cambiarFotoZoom(desplazamiento) {
        if (!datosZoom || datosZoom.producto.fotos.length < 2) {
            return;
        }

        const total = datosZoom.producto.fotos.length;
        const indice = (datosZoom.fotoActual + desplazamiento + total) % total;

        // Sincroniza la foto ampliada con la foto y miniaturas de la ficha.
        datosZoom.seleccionarFoto(indice);
        actualizarZoom();
    }

    function crearTarjeta(producto) {
        const copia = plantilla.content.cloneNode(true);
        const tarjeta = copia.querySelector("li");
        const botonFoto = tarjeta.querySelector(".vela-foto");
        const fotoPrincipal = botonFoto.querySelector("img");
        const ver = tarjeta.querySelector(".vela-ver");

        if (!tarjeta.querySelector(".vela-columna")) {
            const columna = document.createElement("div");
            columna.className = "vela-columna";
            columna.append(...tarjeta.children);
            tarjeta.append(columna);
        }

        let miniaturas = tarjeta.querySelector(".vela-miniaturas");

        if (!miniaturas) {
            miniaturas = document.createElement("div");
            miniaturas.className = "vela-miniaturas";
            botonFoto.after(miniaturas);
        }

        miniaturas.hidden = true;
        miniaturas.setAttribute("role", "group");
        miniaturas.setAttribute("aria-label", "Fotos de " + producto.nombre);

        tarjeta.querySelector(".vitrina-nombre").textContent = producto.nombre;

        const datos = {
            producto,
            tarjeta,
            botonFoto,
            ver,
            miniaturas,
            fotoActual: 0,
            seleccionarFoto
        };

        function seleccionarFoto(indice) {
            datos.fotoActual = indice;

            const foto = producto.fotos[indice];
            fotoPrincipal.src = foto.src;
            fotoPrincipal.alt = foto.alt;

            actualizarAccionFoto(datos);

            [...miniaturas.children].forEach((boton, posicion) => {
                boton.setAttribute(
                    "aria-pressed",
                    String(posicion === indice)
                );
            });
        }

        if (producto.fotos.length > 1) {
            producto.fotos.forEach((foto, indice) => {
                const boton = document.createElement("button");
                const imagen = document.createElement("img");

                boton.type = "button";
                boton.className = "vela-miniatura";
                boton.setAttribute(
                    "aria-label",
                    "Mostrar foto " + (indice + 1) + " de " + producto.nombre
                );

                imagen.src = foto.src;
                imagen.alt = "";

                boton.append(imagen);
                boton.addEventListener("click", () => seleccionarFoto(indice));
                miniaturas.append(boton);
            });
        }

        if (producto.fotos.length > 0) {
            seleccionarFoto(0);

            botonFoto.addEventListener("click", () => {
                if (activa === datos) {
                    abrirZoom(datos);
                } else {
                    abrirFicha(datos);
                }
            });
        } else {
            botonFoto.hidden = true;
        }

        ver.setAttribute("aria-label", "Ver ficha de " + producto.nombre);
        ver.setAttribute("aria-controls", producto.ficha.id);
        ver.addEventListener("click", () => abrirFicha(datos));

        tarjetasVisibles.set(producto.ficha.id, datos);

        return copia;
    }

    function mostrarPagina(nuevaPagina) {
        if (nuevaPagina < 0 || nuevaPagina >= totalPaginas) {
            return;
        }

        if (visor.open) {
            visor.close();
        }

        cerrarFicha();
        pagina = nuevaPagina;
        tarjetas.replaceChildren();
        tarjetasVisibles.clear();

        const inicio = pagina * porPagina;

        productos.slice(inicio, inicio + porPagina).forEach(producto => {
            tarjetas.append(crearTarjeta(producto));
        });

        numeroPagina.textContent =
            "Página " + (pagina + 1) + " de " + totalPaginas;

        anterior.disabled = pagina === 0;
        siguiente.disabled = pagina === totalPaginas - 1;
    }

    function abrirDesdeEnlace() {
        const id = window.location.hash.slice(1);
        const indice = productos.findIndex(producto => producto.ficha.id === id);

        if (indice === -1) {
            return;
        }

        mostrarPagina(Math.floor(indice / porPagina));
        abrirFicha(tarjetasVisibles.get(id));
    }

    anterior.addEventListener("click", () => {
        mostrarPagina(pagina - 1);

        if (anterior.disabled) {
            siguiente.focus();
        }
    });

    siguiente.addEventListener("click", () => {
        mostrarPagina(pagina + 1);

        if (siguiente.disabled) {
            anterior.focus();
        }
    });

    anteriorZoom.addEventListener("click", () => {
        cambiarFotoZoom(-1);
    });

    siguienteZoom.addEventListener("click", () => {
        cambiarFotoZoom(1);
    });

    // La imagen y el fondo cierran el visor. Las flechas permiten navegar.
    visor.addEventListener("click", evento => {
        if (!evento.target.closest(".visor-flecha")) {
            visor.close();
        }
    });

    // También permite recorrer las fotografías con el teclado.
    visor.addEventListener("keydown", evento => {
        if (evento.key === "ArrowLeft") {
            evento.preventDefault();
            cambiarFotoZoom(-1);
        } else if (evento.key === "ArrowRight") {
            evento.preventDefault();
            cambiarFotoZoom(1);
        }
    });

    visor.addEventListener("close", () => {
        const botonOrigen = datosZoom?.botonFoto;
        datosZoom = null;

        if (botonOrigen?.isConnected) {
            botonOrigen.focus({ preventScroll: true });
        }
    });

    deposito.hidden = true;
    tarjetas.hidden = false;
    paginacion.hidden = !paginar;

    mostrarPagina(0);
    abrirDesdeEnlace();

    window.addEventListener("hashchange", abrirDesdeEnlace);
})();