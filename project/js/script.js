/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list'),
    button = document.querySelector("button"),
    form = document.querySelector("form.add"),
    check = form.querySelector('[type=checkbox]');
    

button.addEventListener("click", (event) => {
    event.preventDefault();
    let inputValue = document.querySelector('.adding__input').value;
    if (inputValue) {
        if (check.checked) {
            alert("Добавляем любимый фильм");
        }
        if (inputValue.length >= 21) {
            //inputValue.splice(21, inputValue.length - 21, '...');
            inputValue = inputValue.slice(0, 20) + "...";
        }
        movieDB.movies.push(inputValue);
        movieDB.movies.sort();
        addFilm();
    }
    form.reset();
});


adv.forEach(item => {
    item.remove();
});

genre.textContent = 'драма';

poster.style.backgroundImage = 'url("img/bg.jpg")';



movieDB.movies.sort();

function addFilm() {
    movieList.innerHTML = "";
    movieDB.movies.forEach((film, i) => {
        movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
    `;
    });

    let arrOfFilms = document.querySelectorAll('.delete');
    arrOfFilms.forEach((film, i) => {
        film.addEventListener("click", () => {
            film.parentElement.remove();
            movieDB.movies.splice(i, 1);
            addFilm();
        });
    });
}

addFilm();
