document.addEventListener("DOMContentLoaded", () => {
    const tab = document.querySelector(".tabheader__items"),
          content = document.querySelectorAll(".tabcontent"),
          tabs = tab.querySelectorAll(".tabheader__item");
    
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
    
    const endDate = new Date(2020, 11, 22);
    
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
          closeModal = modal.querySelector(".modal__close"),
          btns = document.querySelectorAll('[data-btn]');
    
    function openWindow() {
        modal.classList.add("show");
        //modalWindow.style.display = "block";
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearTimeout(openModalAfterStart);
    }
    
    btns.forEach(btn => {
        btn.addEventListener("click", openWindow);
    });
    
    function closeWindow () {
        modal.classList.add("hide");
        modal.classList.remove("show"); 
        document.body.style.overflow = "";
    }
    
    closeModal.addEventListener("click", closeWindow);
    modal.addEventListener("click", e => {
        if(e.target == modal){
            closeWindow();
        }
});
    document.addEventListener("keydown", e => {
        if(e.code  == "Escape"){
            closeWindow();
        }
    });
    
    //const openModalAfterStart = setTimeout(openWindow, 5000);
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
    
    new Menu("img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            229,
            '.menu .container').render();
    
    new Menu("img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            550,
            '.menu .container').render();
    
    new Menu("img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            430,
            '.menu .container').render();
});