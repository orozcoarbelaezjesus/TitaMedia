var categoria = document.createElement("div");
var pagina = 1;
var primerRenderizado = 0;
var busqueda = document.querySelector("#busqueda");

categoria.innerHTML = "all";

const categorias = document.querySelectorAll(".categoria");
const contenedorDiseños = document.getElementById("contenedor-diseños");
const opcionIconos = document.getElementById("opcion-iconos");
const opcionLista = document.getElementById("opcion-lista");
const mostrarMas = document.getElementById("mostrarMas");
const menuDesplegable = document.querySelector(".menu-desplegable");
const botonMenuDesplegable = document.getElementById("menu-desplegable");
const verTrabajos = document.getElementById("ver-trabajos");
const botonBusqueda = document.getElementById("buscador");
const realizarBusqueda = document.getElementById("icon-search-one");
const realizarBusquedaSegundo = document.getElementById("icon-search-two")
const realizarBusquedaTercero = document.getElementById("icon-search-three");
const barraDeBusqueda = document.getElementById("barra-busqueda");

// Función para llevar al usuario hacia el comienzo de la sección de las vistas para ver las nuevas
// imágenes que cargo la página, elegir como quiere verlas y realizar otras búsquedas

const scroll = () => {
    const referencia = document.querySelector(".vistas");
    referencia.scrollIntoView("smoot", "start");
}

// Botón para ver los trabajos realizados, redirige a la sección de las imágenes

verTrabajos.addEventListener("click", e => {
    e.preventDefault();
    scroll();
});

// Renderizar las imágenes que se solicitaron a la API

const renderizar = (categoria,pagina) => {
    let clave=categoria.innerHTML;
    contenedorDiseños.innerHTML="";
    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${clave}&per_page=10&page=${pagina}`;
    fetch(url)
        .then(response => {
            response.json().then(data => {
                for(elemento of data.hits){
                    contenedorDiseños.innerHTML = contenedorDiseños.innerHTML + `
                    <div class="item" id="${elemento.id}">
                        <a href="${elemento.largeImageURL}" target="_blank"">
                            <img src="${elemento.webformatURL}" alt="imagen...">
                        </a>
                    </div>
                    `;
                    var item = document.getElementById(`${elemento.id}`)
                    if(elemento.id%2===0){
                      item.classList.add("level-1");
                    }
                    else {
                      item.classList.add("level-2");
                    }
                }
                if(primerRenderizado==0){
                    primerRenderizado+=1;
                }
                else {
                  scroll();
                }
            })
        })

        menuDesplegable.classList.remove("menu-desplegable-visible");
}

// Realizar búsquedas seleccionando desde el menú de navegación

categorias.forEach((elemento) => {
    elemento.addEventListener("click", (e) => {
        e.preventDefault();
        categorias.forEach( (enlace) => {
            enlace.classList.remove("activo");
        });

        e.target.classList.add("activo");

        categorias.forEach((enlace) =>  {
            if(e.target.innerText.toLowerCase() === enlace.innerText.toLowerCase()){
                enlace.classList.add("activo")
            }
        })

        let categoriaSeleccionada = e.target.innerHTML.toLowerCase();

        categoria.innerHTML = categoriaSeleccionada;

        pagina=1;

        if(barraDeBusqueda.classList.contains("barra-busqueda-visible")){
            barraDeBusqueda.classList.add("barra-busqueda-invisible");
            barraDeBusqueda.classList.remove("barra-busqueda-visible");
        }

        renderizar(categoria,pagina)

    });
});

// Mostrar y ocultar la barra de búsqueda haciendo clic en los tres iconos con forma de lupa

realizarBusqueda.addEventListener("click", (e) => {
    e.preventDefault();
    const barraDeBusqueda = document.getElementById("barra-busqueda");
    if(barraDeBusqueda.classList.contains("barra-busqueda-invisible")){
        barraDeBusqueda.classList.remove("barra-busqueda-invisible");
        barraDeBusqueda.classList.add("barra-busqueda-visible");
        scroll();
    }
    else {
        barraDeBusqueda.classList.add("barra-busqueda-invisible");
        barraDeBusqueda.classList.remove("barra-busqueda-visible");
    }
})

realizarBusquedaSegundo.addEventListener("click", (e) => {
    e.preventDefault();
    if(barraDeBusqueda.classList.contains("barra-busqueda-invisible")){
        barraDeBusqueda.classList.remove("barra-busqueda-invisible");
        barraDeBusqueda.classList.add("barra-busqueda-visible");
    }
    else {
        barraDeBusqueda.classList.add("barra-busqueda-invisible");
        barraDeBusqueda.classList.remove("barra-busqueda-visible");
    }
})

realizarBusquedaTercero.addEventListener("click", (e) => {
    e.preventDefault();
    if(barraDeBusqueda.classList.contains("barra-busqueda-invisible")){
        barraDeBusqueda.classList.remove("barra-busqueda-invisible");
        barraDeBusqueda.classList.add("barra-busqueda-visible");
    }
    else {
        barraDeBusqueda.classList.add("barra-busqueda-invisible");
        barraDeBusqueda.classList.remove("barra-busqueda-visible");
    }
})

// Obtener el texto que ingresa el usuario en el campo de texto

busqueda.addEventListener("input", (e) => {
    categoria.innerHTML = e.target.value;
    console.log(categoria.innerHTML);
})

// Buscar haciendo clic en el boton junto al campo de texto

botonBusqueda.addEventListener("click", (e) => {
    e.preventDefault();
    categoria.innerText = busqueda.value;
    renderizar(categoria,1);
})

// Desplegar y ocultar el menú en la versión responsive

botonMenuDesplegable.addEventListener("click", () => {
    if(menuDesplegable.classList.contains("menu-desplegable-visible")){
        menuDesplegable.classList.remove("menu-desplegable-visible")
    }
    else{
        menuDesplegable.classList.add("menu-desplegable-visible");
    }
})

// Opción para ver imágenes tipo lista o en icónos

opcionLista.addEventListener("click", (e) => {
    e.preventDefault();
    contenedorDiseños.classList.remove("vista-iconos");
    contenedorDiseños.classList.add("vista-lista");
})

opcionIconos.addEventListener("click", (e) => {
    e.preventDefault();
    contenedorDiseños.classList.remove("vista-lista");
    contenedorDiseños.classList.add("vista-iconos");
})

// Botón para realizar más búsquedas con la palabra clave
// Ver una segunda páginación

mostrarMas.addEventListener("click", (e) => {
    e.preventDefault();
    pagina+=1;
    renderizar(categoria,pagina);
    scroll();
})
