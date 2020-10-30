document.addEventListener("DOMContentLoaded", () => {
    const tab = document.querySelector(".tabheader__items"),
          content = document.querySelectorAll(".tabcontent"),
          tabs = tab.querySelectorAll(".tabheader__item"),
          formElement = document.querySelectorAll("form");    
    
    function hide(){
        content.forEach(item => {
           item.style.display = "none"; 
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }
    function makeActive(i = 0){
        tabs[i].classList.add("tabheader__item_active");
        content[i].style.display = "block";
    }
    hide(); 
    makeActive();
    
    tab.addEventListener("click", e => {
       const target = e.target;
        tabs.forEach((item, i) => {
            if(target == item){
                hide();
                makeActive(i);
            }
        });
    });
    
    const endDate = new Date(2020, 10, 22);
    function getTimer (d) {
        const remain = new Date(d - new Date()),
              days = remain.getDate()-1,
              hours = remain.getUTCHours(),
              minutes = remain.getMinutes(),
              SECONDS = remain.getSeconds();
        return {
            ddd: remain,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: SECONDS,
        };
    }
    
    function runTimer(date){
            let daysc = document.querySelector("#days"),
            hoursc = document.querySelector("#hours"),
            minutesc = document.querySelector("#minutes"),
            secondsc = document.querySelector("#seconds");
            changeTimer();
            const inst = setInterval(changeTimer, 1000);
        function changeTimer(){
            const intime = getTimer(date);
            if(intime.ddd <= 0){
                clearInterval(inst);
            }
            daysc.textContent = intime.days,
            hoursc.textContent = intime.hours,
            minutesc.textContent = intime.minutes,
            secondsc.textContent = intime.seconds;
        }   
    }
    runTimer(endDate);
    
    const modal = document.querySelector(".modal"),
          modalDialog = modal.querySelector(".modal__content"),
          btns = document.querySelectorAll('[data-btn]');
    
    function openWindow() {
        modal.classList.add("show");
        //modalWindow.style.display = "block";
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        //clearTimeout(openModalAfterStart);
    }
    
    btns.forEach(btn => {
        btn.addEventListener("click", openWindow);
    });
    
    function closeWindow () {
        modal.classList.add("hide");
        modal.classList.remove("show"); 
        document.body.style.overflow = "";
    }
    
    modal.addEventListener("click", e => {
        if(e.target == modal || e.target.getAttribute("data-close") == ""){
            closeWindow();
        }
});
    document.addEventListener("keydown", e => {
        if(e.code  == "Escape"){
            closeWindow();
        }
    });
    
    //openModalAfterStart = setTimeout(openWindow, 5000);
    window.addEventListener("scroll", () => {
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openWindow();
    }
    });
    
    class Menu {
        constructor (img, alt, subtitle, description, price, parentSelector){
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
        }
        render(){
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }
    
//    const getResources = async (url) => {
//      const res = await fetch(url);
//        
//        if(!res.ok) {
//            throw new Error(`Could not fetch ${url}, status is ${res.status}`);
//        }
//        
//        return await res.json();
//    };
    
//    getResources('http://localhost:3000/menu')
//        .then(menus => {
//            menus.forEach(({img, altimg, title, descr, price}) => {
//                new Menu(img, altimg, title, descr, price, '.menu .container').render();
//            }) 
//    });
    
    axios.get("http://localhost:3000/menu")
        .then(menus => {
            menus.data.forEach(({img, altimg, title, descr, price}) => {
                new Menu(img, altimg, title, descr, price, '.menu .container').render();
            })
    });
    
    const message = {
        load: "img/form/progress_bar.gif",
        done: "Loadind is succesfull",
        fail: "Loadind is failed",
    };
    
    const postData = async (url, data) => {
      const res = await fetch(url, {
          method : "POST",
          headers: {
              'Content-type' : 'application/json'
          },
          body: data
      });
        console.log(res);
        return await res.json();
    };
    
    function bindPostData(form){
            form.addEventListener("submit", (e) => {
                //form.insertAdjacentHTML("beforeEnd", sms);
                const img = document.createElement('img');
                img.src = message.load;
                e.preventDefault();
                
                const formdata = new FormData(form);
                const json = JSON.stringify(Object.fromEntries(formdata.entries()));
                postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    createNewModal(message.done);
                })
                .catch(() => {createNewModal(message.fail)})
                .finally(() => {
                    form.reset();
                });
            });
    }
    
    function createNewModal(sms) {
        const newModal = document.createElement('div');
        modalDialog.classList.add('hide');
        openWindow();
        newModal.classList.add("modal__dialog");
        newModal.innerHTML = `<div class="modal__content">
        <div class="modal__close" data-close="">&times;</div>
        <div class="modal_title">${sms}</div></div>`;
        //closeWindow();
        newModal.classList.add("show");
        modal.append(newModal);
        setTimeout(() => {
            closeWindow();
            newModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
        }, 4000);
    }
    
    formElement.forEach(item => {
        bindPostData(item);
    });
    
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slideWrapper = document.querySelector('.offer__slider-wrapper'),
          slideInner = document.querySelector('.offer__slider-inner'),
          slider = document.querySelector('.offer__slider'),
          width = window.getComputedStyle(slideWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
    total.textContent = `0${slides.length}`;
    
    slideInner.style.width = 100 * slides.length + "%";
    slideInner.style.display = 'flex';
    slideInner.style.transition = '0.5s all';
    slideWrapper.style.overflow = "hidden";
    
    slides.forEach(slide => {
        slide.style.width = width;
    });
    
     slider.style.position = 'relative';
    
    const indicators = document.createElement('ol');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
    
    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-up-to', i + 1);
        dot.classList.add("dots");
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        
        if(i == 0) {
            dot.style.opacity = "1";  
        }
        
        indicators.append(dot);
    }
    
    const dots = document.querySelectorAll('.dots');
    
        function changeOpacity (){
            dots.forEach(dot1 => {
                dot1.style.opacity = '0.5';
            });
                dots[slideIndex -1].style.opacity = '1';
        };
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e)=> {
            slideIndex = e.target.getAttribute('data-up-to');
            
            slideInner.style.transform = `translateX(-${+width.slice(0, width.length - 2) * (e.target.getAttribute('data-up-to') - 1)}px)`;

            current.textContent = `0${slideIndex}`;
            
            changeOpacity();            
        });
    });
    
    prev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        }else {
            offset -= +width.slice(0, width.length - 2);
        }
       slideInner.style.transform = `translateX(-${offset}px)`; 
        
        if(slideIndex <= 1){
            slideIndex = slides.length;
        }else {
            slideIndex--;
        }
        current.textContent = `0${slideIndex}`;
        
        changeOpacity();
    });
    
    next.addEventListener('click', ()=>{
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
            offset = 0;
        }else {
            offset += +width.slice(0, width.length - 2);
        }
       slideInner.style.transform = `translateX(-${offset}px)`; 
        if(slideIndex >= slides.length){
            slideIndex = 1;
        }else {
            slideIndex++;
        }
        current.textContent = `0${slideIndex}`;
        
        changeOpacity();
    });
    
    
//    switchSlide(slideIndex);
//    
//    function switchSlide (n) {
//        if(n > slides.length){
//            slideIndex = 1;
//        }
//        if(n < 1) {
//            slideIndex = slides.length;
//        }
//        
//        current.textContent = `0${slideIndex}`;
//        
//        slides.forEach(item => {
//            item.style.display = 'none';
//        });
//        
//        slides[slideIndex-1].style.display = 'block';
//    }
//    
//    prev.addEventListener('click', () => {
//       switchSlide(--slideIndex); 
//    });
//    
//    next.addEventListener('click', () => {
//       switchSlide(++slideIndex); 
//    });
});