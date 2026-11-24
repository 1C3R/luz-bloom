# Luz & Bloom

Sitio web para un emprendimiento dedicado a la elaboración artesanal de velas, jabones y sales de baño. Desarrollado progresivamente para la asignatura Diseño Web de Instituto IPLACEX.

## Enlaces

- [Sitio publicado en Netlify](https://luzybloom.netlify.app/)
- [Repositorio en GitHub](https://github.com/1C3R/luz-bloom)

## Objetivo

Presentar los productos del emprendimiento mediante fotografías y catálogos organizados por categoría, y facilitar las consultas a través de WhatsApp y un formulario de contacto.

## Páginas

- Inicio; presenta la marca y una selección aleatoria de tres productos.
- Productos; reúne los accesos a los catálogos y la información general de ingredientes y elaboración.
- Velas, Jabones y Sales; muestran los productos y sus fichas.
- Quiénes somos; contiene la historia, misión, visión y valores del emprendimiento.
- Contacto; reúne WhatsApp, formulario y redes sociales.
- Gracias; confirma mediante un agradecimiento el envío del formulario.

## Tecnologías y recursos

- HTML5 para la estructura y el contenido.
- CSS3 para la presentación y la adaptación a distintos tamaños de pantalla.
- JavaScript para las interacciones del sitio.
- Template Assan Beauty Spa, proporcionado como material de la asignatura y adaptado a Luz & Bloom.
- Fotografías y logo en formato WebP.
- GitHub para alojar el código.
- Netlify para publicar el sitio y recibir consultas mediante Netlify Forms.

## Funcionalidades JavaScript

### Selección de productos

`js/inicio.js` selecciona tres productos al cargar el inicio y actualiza sus fotografías, nombres y enlaces. Utiliza `sessionStorage` para evitar repetir el mismo grupo en dos cargas consecutivas cuando el almacenamiento está disponible.

### Catálogos interactivos

`js/catalogos.js` permite:

- Abrir una ficha desde el botón «Ver» o desde la fotografía.
- Ampliar la fotografía cuando la ficha está abierta.
- Seleccionar miniaturas cuando un producto tiene varias imágenes.
- Recorrer las fotografías del visor mediante flechas y teclas de dirección.
- Cerrar el visor al pulsar fuera de las flechas.
- Abrir una ficha desde los enlaces del inicio.
- Activar la paginación cuando una categoría alcanza veinte productos.

### Información de ingredientes

`js/ingredientes.js` abre fichas con la información general de elaboración e ingredientes. Las fichas se cierran al pulsarlas, al pulsar el fondo o con la tecla Escape.

## Eventos utilizados

- `click` para abrir fichas, seleccionar fotografías y utilizar los controles.
- `keydown` para recorrer fotografías con el teclado.
- `close` para devolver el foco al control que abrió un visor.
- `hashchange` para abrir la ficha indicada en un enlace.

## Estructura del proyecto

```text
Luz_Bloom/
├── css/
├── img/
│   └── Mejoradas/
├── js/
│   ├── catalogos.js
│   ├── ingredientes.js
│   └── inicio.js
├── vendor/
│   └── beauty-spa/
├── contacto.html
├── gracias.html
├── index.html
├── jabones.html
├── nosotros.html
├── productos.html
├── sales.html
├── velas.html
└── README.md
```

## Ejecución local

1. Descargar el repositorio y descomprimirlo, o clonarlo.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir `index.html` con la extensión Live Server.

La recepción del formulario requiere el despliegue en Netlify con la detección de formularios habilitada. Las consultas recibidas se revisan en el apartado Forms del proyecto.

## Comprobaciones realizadas

- Navegación entre páginas y categorías.
- Apertura de fichas desde botones y fotografías.
- Ampliación y recorrido de imágenes.
- Apertura y cierre de información de ingredientes.
- Revisión de la distribución al reducir el ancho de la ventana.
- Envío del formulario publicado, acceso a la página de agradecimiento y registro de la consulta en Netlify Forms.

## Integrantes y aportes

- Mauricio Medina Aguilera - Creador y diseñador del proyecto por completo.

## Estado de las redes sociales

Los enlaces de Instagram y TikTok son de demostración mientras se crean las cuentas oficiales del emprendimiento, posterior a la aprobación de éstas por parte del emprendedor.
