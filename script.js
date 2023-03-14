const form = document.querySelector('.form');
const inputName = form.elements.name;
const inputText = form.elements.text;
const inputDate = form.elements.date;
//const inputBtn = form.elements.btn;
const commentList = document.querySelector('.comments__list');
const heart = document.querySelector('.comment__fav-btn');
const trash = document.querySelector('.comment__remove-btn');
/* TODO 
--- если не задано, то дата текущая


добавить валидацию (какие именно ограничения - на свое усмотрение).
Если форма заполнена некорректно (например, имя пустое), то рядом с полем сообщение об ошибке
когда в поле начинаем печатать, то ошибка исчезает
- дата, время добавления
-- если текущая дата, пишем "сегодня, 16:23" (ключевое - слово сегодня, время подставляется)
-- если вчерашняя дата, пишем "вчера, 18:39"
*/

heart.addEventListener('click', () => {
  heart.classList.toggle('favourite');
});

trash.addEventListener('click', () => {
  trash.closest('.comment').style.display = 'none';
});

const error = 'null';

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (error !== null) {
    addComment();
    clearInputs();
  }
});

function dateFormatted() {
  let d = new Date();
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes(),
  ].map((component) => component.slice(-2));

  return d;
}

function addComment() {
  let date = dateFormatted();
  if (inputDate.value) date = inputDate.value;
  commentList.prepend(makeComment(inputName.value, inputText.value, date));
}
function makeComment(name, text, date) {
  const li = document.createElement('li');
  li.classList.add('comment');
  li.innerHTML = `<div class="comment__top-box">
                <h2 class="comment__name">${name}</h2>
                <p class="comment__date">${date}</p>
              </div>

              <p class="comment__text">${text}</p>
              <div class="comment__icon-box">
                <button class="comment__fav-btn" type="button">Cерд</button>
                <button class="comment__remove-btn" type="button">Корз</button>
              </div>`;
  return li;
}

function clearInputs() {
  inputName.value = '';
  inputText.value = '';
  inputDate.value = '';
}
