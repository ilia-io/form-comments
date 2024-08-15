const form = document.querySelector('.form');
const inputName = form.elements.name;
const inputText = form.elements.text;
const inputDate = form.elements.date;
const commentList = document.querySelector('.comments__list');

const dummyData = [
  {
    id: 0,
    username: 'Dan',
    text: 'This is a comment.',
    date: '2024-08-14T12:34:56.789Z',
    liked: false,
  },
  {
    id: 1,
    username: 'Mari',
    text: 'Мне нравится этот комментарий!',
    date: '2024-08-14T12:34:56.789Z',
    liked: true,
  },
];

function generateId() {
  return '@_' + Math.random().toString(16).substring(2, 12);
}

function saveComment(username, commentText, inputDate) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  const newComment = {
    id: generateId(),
    username: username,
    text: commentText,
    date: inputDate,
    liked: false,
  };

  comments.push(newComment);

  localStorage.setItem('comments', JSON.stringify(comments));
}

function deleteComment(id) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];

  comments = comments.filter((comment) => comment.id !== id);
  localStorage.setItem('comments', JSON.stringify(comments));
  renderComments();
}

function toggleLike(id) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments = comments.map((comment) => {
    if (comment.id === id) {
      comment.liked = !comment.liked;
    }
    return comment;
  });
  localStorage.setItem('comments', JSON.stringify(comments));
  renderComments();
}

function renderComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  const commentsList = document.getElementById('comments__list');

  commentsList.innerHTML = '';

  comments.reverse().forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    const commentTopElement = document.createElement('div');
    commentTopElement.classList.add('comment__top-box');

    const usernameElement = document.createElement('h2');
    usernameElement.classList.add('comment__name');
    usernameElement.textContent = comment.username;

    const dateElement = document.createElement('p');
    dateElement.classList.add('comment__date');
    dateElement.textContent = processDate(comment.date);

    const textElement = document.createElement('p');
    textElement.classList.add('comment__text');
    textElement.textContent = comment.text;

    const iconsElement = document.createElement('div');
    iconsElement.classList.add('comment__icon-box');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => {
      deleteComment(comment.id);
    };

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    if (comment.liked) {
      likeButton.classList.add('liked');
    }
    likeButton.onclick = () => {
      toggleLike(comment.id);
    };

    commentTopElement.appendChild(usernameElement);
    commentTopElement.appendChild(dateElement);
    iconsElement.appendChild(likeButton);
    iconsElement.appendChild(deleteButton);
    commentElement.appendChild(commentTopElement);
    commentElement.appendChild(textElement);
    commentElement.appendChild(iconsElement);
    commentsList.appendChild(commentElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('comments')) {
    localStorage.setItem('comments', JSON.stringify(dummyData));
  }
  renderComments();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = inputName.value;
  const commentText = inputText.value;
  const date = !inputDate.value ? new Date().toISOString() : new Date(inputDate.value);
  if (username.trim() && commentText.trim()) {
    saveComment(username, commentText, date);
    renderComments();
    clearInputs();
  }
});

inputName.addEventListener('blur', () => {
  if (!inputName.value) errorMessage(inputName);
});
inputText.addEventListener('blur', () => {
  if (!inputText.value) errorMessage(inputText);
});
inputName.addEventListener('focus', () => cleanErrorOn(inputName));
inputText.addEventListener('focus', () => cleanErrorOn(inputText));
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
function processDate(date) {
  if (!date) return;
  const d = new Date(date.substring(0, 10));
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
function cleanErrorOn(element) {
  if (element.nextElementSibling.classList.contains('error')) {
    element.nextElementSibling.remove();
    element.style.border = '2px solid transparent';
  }
}
