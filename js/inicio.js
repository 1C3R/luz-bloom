/*
 * Selección aleatoria de productos para el inicio de Luz & Bloom.
 */

(() => {
    const productos = [
        [
            "Vela de naranja y canela",
            "20261020_104635-v2.webp",
            "velas.html#naranja-canela"
        ],
        [
            "Vela de rosas",
            "20261020_104713-v2.webp",
            "velas.html#rosas"
        ],
        [
            "Vela Jardín floral",
            "20261020_104932-v2.webp",
            "velas.html#jardin-floral"
        ],
        [
            "Vela de rosas en recipiente decorado",
            "20261020_104755-v2.webp",
            "velas.html#rosa-decorativa"
        ],
        [
            "Vela de lavanda",
            "20261020_110447-v2.webp",
            "velas.html#lavanda"
        ],
        [
            "Vela de menta y romero",
            "20261020_104449-v3.webp",
            "velas.html#menta-romero"
        ],
        [
            "Vela aromática de coco",
            "20261020_104854-v2.webp",
            "velas.html#coco"
        ],
        [
            "Jabón de lavanda",
            "20261020_105540-v2.webp",
            "jabones.html#lavanda"
        ],
        [
            "Jabón de arroz",
            "20261020_105752-v2.webp",
            "jabones.html#arroz"
        ],
        [
            "Jabón de café y clavo de olor",
            "20261020_110356-v2.webp",
            "jabones.html#cafe-clavo"
        ],
        [
            "Jabones para regalo",
            "20261020_110549-v2.webp",
            "jabones.html#regalos"
        ],
        [
            "Jabones aromáticos de colores",
            "20261020_105025-v2.webp",
            "jabones.html#aromaticos-colores"
        ],
        [
            "Jabones aromáticos florales",
            "20261020_105133-v2.webp",
            "jabones.html#aromaticos-florales"
        ],
        [
            "Jabón floral para el baño",
            "20261020_105230-v2.webp",
            "jabones.html#bano-floral"
        ],
        [
            "Jabón aromático floral",
            "20261020_105346-v2.webp",
            "jabones.html#aromatico-floral"
        ],
        [
            "Jabón en barra de manzanilla",
            "20261020_105841-v2.webp",
            "jabones.html#manzanilla"
        ],
        [
            "Jabón de café",
            "20261020_110308-v2.webp",
            "jabones.html#cafe"
        ],
        [
            "Sales de baño con flores y hierbas",
            "20261020_110623-v2.webp",
            "sales.html#sales-botanicas"
        ]
    ];

    const tarjetas = document.querySelectorAll(
        "#seleccion-productos .tarjeta-producto"
    );

    if (tarjetas.length === 0 || tarjetas.length > productos.length) {
        return;
    }

    const mezcla = [...productos];

    // Mezcla sin repetir productos dentro de la misma selección.
    for (let indice = mezcla.length - 1; indice > 0; indice--) {
        const posicion = Math.floor(Math.random() * (indice + 1));

        [mezcla[indice], mezcla[posicion]] = [
            mezcla[posicion],
            mezcla[indice]
        ];
    }

    const seleccion = mezcla.slice(0, tarjetas.length);
    const clave = "luz-bloom-productos-inicio";

    function identificarGrupo(grupo) {
        return grupo
            .map(producto => producto[2])
            .sort()
            .join("|");
    }

    // Evita repetir el mismo grupo de la carga anterior cuando hay alternativas.
    try {
        const grupoAnterior = sessionStorage.getItem(clave);

        if (
            identificarGrupo(seleccion) === grupoAnterior &&
            mezcla.length > tarjetas.length
        ) {
            seleccion[seleccion.length - 1] = mezcla[tarjetas.length];
        }

        sessionStorage.setItem(clave, identificarGrupo(seleccion));
    } catch {
        // La selección también funciona si el navegador bloquea el almacenamiento.
    }

    tarjetas.forEach((tarjeta, indice) => {
        const [nombre, archivo, destino] = seleccion[indice];
        const imagen = tarjeta.querySelector("img");
        const enlaceFoto = tarjeta.querySelector(".producto-foto");
        const enlaceProducto = tarjeta.querySelector(".producto-enlace");

        tarjeta.querySelector("h3").textContent = nombre;

        imagen.src = "img/Mejoradas/" + archivo;
        imagen.alt = nombre;

        enlaceFoto.href = destino;
        enlaceFoto.setAttribute("aria-label", "Ver " + nombre);

        enlaceProducto.href = destino;
        enlaceProducto.setAttribute("aria-label", "Ver " + nombre);
    });
})();