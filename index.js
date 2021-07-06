
import indexslider from "./indexslider.js";

document.addEventListener("DOMContentLoaded", function () {


    const buton = document.querySelector('.btn');
    buton.addEventListener('click', () => console.log("se clickeo boton"));


    const indexSliderContainer = document.querySelector('#index-slider-container'); //Contender del slider

    //Chequeamos que exista el padre que contiene el slider y lo pasamos como primer parametro dentro de la funcion
    //Luego pasamos varias configuraciones como segundo parametro
    if (indexSliderContainer) {

        indexslider( indexSliderContainer, {

            touch: true, //Habilita el touch en dispositivos tactiles para scrollear horizontalmente el slider

            touchY: false,  /* Habilita el touch vertical y que genere scroll a la derecha o izquierda, por default en false
                              Esta opcion se podria habilitar en los casos en que por ejemplo el slider sea lo unico visible de la pantalla
                              (para utilizar esto tiene que estar activado el touch en true) */

            keys: true, //El slider se movera con las 4 flechas del teclado.  RETROCEDE⬅ ⮕AVANZA ㋡ AVANZA⬆ ⬇RETROCEDE

            mousewheel: true, /*El slider se movera scrolleando hacia abajo o arriba con el evento de wheel y/o DOMMouseScroll
                                Esta opcion se podria habilitar en los casos en que por ejemplo el slider sea lo unico visible de la pantalla */

            speed: 350, //Velocidad de transicion del slide. Equivale a milisegundos.

            indicators: true, //Agrega los indicadores para visualizar cantidad y tambien mover el slider, para cancelar poner en false.

            arrows: true, //Agrega flechas en el contenedor para mover el slider, para cancelar poner en false.

            autoLoop: false, //Pasar cantidad en milisegundos para activar. Ej:(4000) avanza el slider automaticamente cada 4 segundos, para cancelar poner en false.
            
            /* Aca podemos pasarle un elemento que se repita en la misma posicion dentro de cada slide,
            al que queremos que los indicadores se peguen/ubiquen en el caso que el elemento se encuentre centrado, luego podemos separarlos aplicando un
            margin-top en en el css de los indicadores. Ej: indexSliderContainer.querySelector('h1') , si no se utiliza poner false.*/
            stickIndicatorsTo: false,


        });

    }
});