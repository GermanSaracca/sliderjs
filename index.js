
import indexslider from "./indexslider.js";

document.addEventListener("DOMContentLoaded", function () {

    const indexSliderContainer = document.querySelector('#index-slider-container'); //Contender del slider

    //Chequeamos que exista el padre que contiene el slider y lo pasamos como primer parametro dentro de la funcion
    //Luego pasamos varias configuraciones como segundo parametro
    if (indexSliderContainer) {

        indexslider( indexSliderContainer, {

            touchX: true, //Habilita el touch de manera horizontal

            touchY: false,  /* Habilita el touch vertical y que genere scroll a la derecha o izquierda, por default en false
                              Esta opcion se podria habilitar en los casos en que por ejemplo el slider sea lo unico visible de la pantalla */

            keys: true, //El slider se movera con las 4 flechas del teclado.  RETROCEDE⬅ ⮕AVANZA ㋡ AVANZA⬆ ⬇RETROCEDE

            mousewheel: false, /*El slider se movera scrolleando hacia abajo o arriba con el evento de wheel y/o DOMMouseScroll
                                Esta opcion se podria habilitar en los casos en que por ejemplo el slider sea lo unico visible de la pantalla */

            speed: 350, //Velocidad de transicion del slide. Equivale a milisegundos.

            indicators: true, //Agrega los indicadores para visualizar cantidad y tambien mover el slider.

            arrows: true, //Agrega flechas en el contenedor para mover el slider.

            autoLoop: 5000, //Avanza el slider solo cada 5 segundos, para cancelar poner en false.
            
            /* Aca podemos pasarle un elemento que se repita en la misma posicion dentro de cada slide,
            al que queremos que los indicadores se peguen/ubiquen, luego podemos separarlos con un margin-top en los indicadores.
            Esta funcionalidad esta false por defecto*/
            stickIndicatorsTo: false,


        });

    }
});