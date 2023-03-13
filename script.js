const form = document.querySelector('.form');
const inputName = form.elements.name;
const inputText = form.elements.text;
const inputDate = form.elements.date;
//const inputBtn = form.elements.btn;

const commentList = document.querySelector('.comments__list');

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
  d = ['0' + d.getDate(), '0' + (d.getMonth() + 1), '' + d.getFullYear()].map(
    (component) => component.slice(-2)
  );

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
