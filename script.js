const form = document.querySelector('.form');
const inputName = form.elements.name;
const inputText = form.elements.text;
const inputDate = form.elements.date;
const commentList = document.querySelector('.comments__list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  addComment();
  clearInputs();
});

inputName.addEventListener('blur', () => {
  if (!inputName.value) errorMessage(inputName);
});

inputText.addEventListener('blur', () => {
  if (!inputText.value) errorMessage(inputText);
});

inputName.addEventListener('focus', () => cleanErrorOn(inputName));

inputText.addEventListener('focus', () => cleanErrorOn(inputText));

function cleanErrorOn(element) {
  if (element.nextElementSibling.classList.contains('error')) {
    element.nextElementSibling.remove();
    element.style.border = '2px solid transparent';
  }
}

function isToday(testDate) {
  const today = new Date();
  return (
    testDate.getDate() === today.getDate() &&
    testDate.getMonth() === today.getMonth() &&
    testDate.getFullYear() === today.getFullYear()
  );
}

function isYesterday(testDate) {
  const yesterday = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
  return (
    testDate.getDate() === yesterday.getDate() &&
    testDate.getMonth() === yesterday.getMonth() &&
    testDate.getFullYear() === yesterday.getFullYear()
  );
}

function processDate() {
  let d = new Date(inputDate.value);
  if (isNaN(d.getTime())) {
    d = new Date();
  } else {
    d.setHours(new Date().getHours());
    d.setMinutes(new Date().getMinutes());
  }
  let arr = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '00' + d.getHours(),
    '00' + d.getMinutes(),
  ].map((component) => component.slice(-2));

  let dateTime = arr.slice(0, 3).join('.') + ' ' + arr.slice(3).join(':');
  let time = arr.slice(3).join(':');

  if (isToday(d)) {
    return `сегодня, ${time}`;
  } else if (isYesterday(d)) {
    return `вчера, ${time}`;
  } else {
    return `${dateTime}`;
  }
}

function addComment() {
  const date = processDate();
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
                  ${heartIconSVG}
                  ${trashIconSVG}
                  </div>`;
  return li;
}

function clearInputs() {
  inputName.value = '';
  inputText.value = '';
  inputDate.value = '';
}

function errorMessage(element) {
  const msg = document.createElement('div');
  msg.innerHTML = 'Заполните это поле';
  msg.classList.add('error');
  element.after(msg);
  element.style.border = '2px solid crimson';
}

const heartIconSVG = `<svg
                  onclick="this.classList.toggle('favourite')"
                  width="30px"
                  height="30px"
                  class="comment__fav-btn"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20C12 20 21 16 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 16 12 20 12 20Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>`;

const trashIconSVG = `<svg
                  onclick="this.closest('.comment').style.display = 'none'"
                  width="30px"
                  height="30px"
                  class="comment__remove-btn"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.10002 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06055L4.88474 20.1871C4.98356 21.7682 6.29471 23 7.8789 23H16.1211C17.7053 23 19.0164 21.7682 19.1153 20.1871L19.9395 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0073C19.0018 4.99995 18.9963 4.99995 18.9908 5H16.9C16.4367 2.71776 14.419 1 12 1C9.58104 1 7.56329 2.71776 7.10002 5ZM9.17071 5H14.8293C14.4175 3.83481 13.3062 3 12 3C10.6938 3 9.58254 3.83481 9.17071 5ZM17.9355 7H6.06445L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1192 20.0624L17.9355 7ZM14.279 10.0097C14.83 10.0483 15.2454 10.5261 15.2068 11.0771L14.7883 17.0624C14.7498 17.6134 14.2719 18.0288 13.721 17.9903C13.17 17.9517 12.7546 17.4739 12.7932 16.9229L13.2117 10.9376C13.2502 10.3866 13.7281 9.97122 14.279 10.0097ZM9.721 10.0098C10.2719 9.97125 10.7498 10.3866 10.7883 10.9376L11.2069 16.923C11.2454 17.4739 10.83 17.9518 10.2791 17.9903C9.72811 18.0288 9.25026 17.6134 9.21173 17.0625L8.79319 11.0771C8.75467 10.5262 9.17006 10.0483 9.721 10.0098Z"
                    fill="#0F1729"
                  />
                </svg>`;
