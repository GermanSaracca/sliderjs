
  
export default function indexslider(wrapper,config) {

    //Desestructuro la configuracion
    const { touchX, touchY, keys, stickIndicatorsTo, mousewheel, speed, indicators, arrows, loop } = config;

    console.table(touchX, touchY, keys, stickIndicatorsTo);


    //------ Elements ------//
    const slider = wrapper.querySelector('.slides-container');
    const originalSlides = [...wrapper.querySelectorAll('.slide')];
    // document.querySelector('body').style.overflow = "hidden";


    //Actualizo los slide originales mas los clones
    let slides = cloneFirstAndLastSlide(originalSlides);
    //Inicializo counter
    let counter = 1;
    //Ancho inicial del primer slide
    let size = slides[0].clientWidth;
    //Ancho de pantalla, para solo llamar a la funcion de scroll con wheel arriba de los 1200px
    let screenWidth = window.innerWidth;
    //Creo indicadores segun cantidad de slides agregados
    indicators && createIndicators();
    //Creo flechas 
    arrows && createArrows();
    //Auto loop
    loop !== false && autoLoop(loop);
    //Centro vista en slide numero 1
    centerSlideOne(counter);


    //------ EventListeners ------//

    //Actualizo la variable size en cada resize
    window.addEventListener('resize', () => {
        size = slides[0].clientWidth;
        centerSlide(size, counter);
        screenWidth = window.innerWidth;
        stickIndicatorsTo && locateIndicator();
    } );
    //Reseteo transicion cuando llego a un clon y salto al original
    slider.addEventListener('transitionend', onTransitionEnds );

    //--Cambiar de slides al hacer scroll--//
    // El parametro numerico determina el tiempo que espera entre pasar de un slide a otro // 
    let scrollEventHandler = moveSlideOnScroll(200);
    
    // IE9, Chrome, Safari, Opera
    mousewheel && wrapper.addEventListener('wheel',scrollEventHandler);
    // Firefox
    mousewheel && wrapper.addEventListener('DOMMouseScroll',scrollEventHandler);

    //Mover slider con el teclado RETROCEDE⬅ ⮕AVANZA ㋡ AVANZA⬆ ⬇RETROCEDE
    keys &&  window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
      
        switch (event.key) {
          case "Down": // IE specific value
          case "ArrowDown":
              prevSlide();
            break;
          case "Up": // IE specific value
          case "ArrowUp":
              nextSlide();
            break;
          case "Left": // IE specific value
          case "ArrowLeft":
            prevSlide();
            break;
          case "Right": // IE specific value
          case "ArrowRight":
            nextSlide();
            break;
   
          default:
            return;
        }
      
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    //Toma como parametro el elemento a evitar click en slider ( con la posicion de uno solo basta)
    // var initialX,finishX,initialY,finishY;
    // function avoidTouchOnElement(elemento){

    //     const boundings = elemento.getBoundingClientRect();

    //     initialX = Math.floor(boundings.x);
    //     finishX = Math.floor(boundings.x) + Math.floor(boundings.width);
    //     initialY = Math.floor(boundings.y);
    //     finishY = Math.floor(boundings.y) + Math.floor(boundings.height);
    // }
    
    // avoidTouchOnElement(ctaButtonSlider);

    
    //------ Functions ------//

    function cloneFirstAndLastSlide(originalSlides){

        //Clone of the first slide -- It goes after the last original slide  of the slider
        let firstSlideClone = originalSlides[0].cloneNode(true);
        firstSlideClone.id = 'first-clone';

        // Clone of the last slide -- It goes before the first original slide  of the slider 
        let lastSlideClone = originalSlides[originalSlides.length - 1].cloneNode(true);
        lastSlideClone.id = 'last-clone';

        //Here is where we set the firstSlideClone as the last child (slide) of the slider
        slider.appendChild(firstSlideClone);

        //Here is where we set the lastSlideClone as the first child (slide) of the slider
        slider.insertBefore(lastSlideClone, originalSlides[0]);

        //Here I set all the array of slides, after we add the clones.
        let slides = [...wrapper.querySelectorAll('.slide')];

        return slides;
    };

    function centerSlide(size, counter) {
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    };

    function nextSlide(){

        if (counter >= slides.length - 1) return;

        slider.style.transition = `transform ${speed}ms ease-in-out`;
        counter++;
        activateIndicator(counter);
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    };

    function prevSlide(){
        if (counter <= 0) return;

        slider.style.transition = `transform ${speed}ms ease-in-out`;
        counter--;
        activateIndicator(counter);
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    };

    function onTransitionEnds() {

        if ( slides[counter].id == 'last-clone'){
            slider.style.transition = "none";
            counter = slides.length - 2;
            slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }

        if ( slides[counter].id == 'first-clone'){
            slider.style.transition = "none";
            counter = slides.length - counter;
            slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    };

    function createIndicators() {

        // const indicatorsWrapper = wrapper.querySelector('.indicators-wrapper');
        const indicatorsWrapper = document.createElement('div');
        indicatorsWrapper.classList = 'indicators-wrapper';
        wrapper.appendChild(indicatorsWrapper);

        originalSlides.forEach((slide, i) => {

            let indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicatorsWrapper.appendChild(indicator);

            let slideIndex = i + 1 ;

            indicator.addEventListener('click', (e) => {
                goToSlide(slideIndex);
            } );
        });

        stickIndicatorsTo !== false && locateIndicator();
    };

    function createArrows() {

        let buttonLeft = document.createElement('button');
        buttonLeft.className = 'arrow-left';
        buttonLeft.textContent = "⬅";
        buttonLeft.addEventListener('click',prevSlide);

        let buttonRight = document.createElement('button');
        buttonRight.className = 'arrow-right';
        buttonRight.textContent = "⮕";
        buttonRight.addEventListener('click',nextSlide);

        wrapper.appendChild(buttonLeft);
        wrapper.appendChild(buttonRight);
    }

    function goToSlide(slideIndex) {
        
        counter = slideIndex;
        slider.style.transition = `transform ${speed}ms ease-in-out`;
        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';

        activateIndicator(slideIndex);
    };

    function centerSlideOne(){

        const indicatorsWrapper = wrapper.querySelector('.indicators-wrapper');

        slider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        //Doy la clase active-slide al indicador numero 1 y al slider en vista.
        indicators && indicatorsWrapper.children[0].classList.add('active-slide');
        slides[1].classList.add('active-slide');
    };

    function activateIndicator(param) {

        let indicatorsWrapper = wrapper.querySelector('.indicators-wrapper');

        setActiveSlider(counter);

        [...wrapper.querySelectorAll('.indicator')].forEach((indic, i) => {
            // console.log(i+1,param);

            //Si el parametro supera la cantidad de slides quiere decir que estamso parados en el primer slide (ultimo clon)
            if(param > indicatorsWrapper.children.length ) {
                indicatorsWrapper.children[0].classList.add('active-slide');
            }
            //Si el parametro es 0 quiere decir que estamos parados en el ultimo slide ( primer clon )
            if(param == 0 ) {
                indicatorsWrapper.children[0].classList.remove('active-slide');
                indicatorsWrapper.lastChild.classList.add('active-slide');
                return;
            }

            if ( i+1 !== param ){
                indic.classList.remove('active-slide');
            } else {
                indic.classList.add('active-slide');
            }
        });
    };

    function locateIndicator(){

        const indicator = wrapper.querySelector('.indicators-wrapper');//Indicador
        const top = stickIndicatorsTo.offsetTop;
        const { height } = stickIndicatorsTo.getBoundingClientRect(); //Altura del elemento a pegar los indicadores
        //Aca posiciono el indicador exactamente debajo del elemento y luego desde css voy dandole el margin-top segun necesite
        indicator.style.top = `${top + height}px`;
    }

    function setActiveSlider(index) {

        //Quito la clase active a todos los slides
        slides.map(slide => slide.classList.remove('active-slide'));

        //Si llego al clon del primer slide, le quito la clase al clon y se la doy al primer slide original
        if (  index == (originalSlides.length + 1) ) {
            slides[1].classList.add('active-slide');
            return;
        }
        //Si llego al clon del ultimo slide, le quito la clase al clon y se la doy al ultimo slide original
        if (  index == 0 ) {
            slides[originalSlides.length].classList.add('active-slide');
            return;
        }

        //Y aplico clase active al slide al que nos dirigimos
        slides[index].classList.add('active-slide');

    };

    function moveSlideOnScroll(ms){

        let allowedScroll = true;

        return (e) => {
            //Retorna 1 o -1 a partir de los resultados que arroja delta.
            let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

            if ( allowedScroll ) {

                if (delta ===- 1) { 
                    nextSlide();
                    allowedScroll = false;
                };
                if (delta ===1 ) { 
                    prevSlide();
                    allowedScroll = false;
                };

                setTimeout(() => {
                    allowedScroll = true;
                }, ms);

            }
        }

    };

    (function ontouchCarousel(elemento) {
        let x1;
        let x2;
        
        let y1;
        let y2;
        

        elemento.addEventListener('touchstart', function(event){

            const btnHref = event.path[0].href;
            const btnTarget = event.path[0].target;

            if ( btnHref !== undefined ) {

                btnTarget === '_blank' ? window.open(btnHref, '_blank')  : window.location = btnHref;
            }

            y1 = event.changedTouches[0].clientY;

            let touchobj = event.changedTouches[0];
            x1 = parseInt(touchobj.clientX);

            if(config.touchY === true){
                event.preventDefault();
            }
            
        });
        
        elemento.addEventListener('touchend', function(event){

            y2 = event.changedTouches[0].clientY;

            let touchobj = event.changedTouches[0];

            //Si y1 || y2 son menores a 0 los voy a convertir en numeros positivos
            if (y1 < 0) { y1 = y1 * -1 };
            if (y2 < 0) { y2 = y2 * -1 };

            let difY = y1 - y2;

            //Si la difY da negativa la convierto a positiva nuevamente para contar con un resultado positivo siempre.
            if(difY < 0 ){
                difY = difY * -1;
            }

            //Este numero parece ser un buen limite para determinar si se esta scrolleando vertical u horizontalmente
            //Si supera los 50 no activamos el scroll del slider ya que no estaria scrolleando de manera totalmente horizontal
            if(config.touchY === false){
                if (difY > 50){
                    return;
                }
            }

            x2 = parseInt(touchobj.clientX);

            if (event.cancelable) event.preventDefault(); //condicional para evitar warning de ===> [Intervention] Ignored attempt to cancel a touchmove event with cancelable=false'

            let dif = x2 - x1;

            //Agrego esta primer condicional para evitar que haga scroll al tocar pantalla o si el scroll es demasiado minimo, casi intencional.
            if (dif > -12 && dif < 12) {
                return;
            }
            else if (dif < -12) {
                nextSlide();
            } else  {
                //retrocede
                prevSlide();
            }
        });

    })(slider);

    function autoLoop(autoLoop) {
        // const loopInterval = setInterval(() => {
        //     nextSlide();
        // }, autoLoop);
        
        // return () => {
        //     clearInterval(loopInterval);
        // }
    }
}
