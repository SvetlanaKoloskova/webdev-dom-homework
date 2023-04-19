import { get, post } from "./api.js";
import { renderComments } from "./render.js";

const listElement = document.getElementById("list");
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textAreaInputElement = document.getElementById("text-area");
const loadingCommentsElement = document.getElementById("loading-comments");

let currentData = { day: 'numeric', month: 'numeric', year: '2-digit' };
let currentTime = { hour: 'numeric', minute: 'numeric' };
let myDate = new Date();
let comments = [];

fetchGet();

buttonElement.addEventListener('click', addComment);

renderComments(listElement, comments);

function addComment() {

  nameInputElement.classList.remove("error");
  if (nameInputElement.value === '') {
    nameInputElement.classList.add("error");
    return;
  }
  textAreaInputElement.classList.remove("error");
  if (textAreaInputElement.value === '') {
    textAreaInputElement.classList.add("error");
    return;
  }

  fetchPost();
}

function fetchGet() {

  buttonElement.disabled = true;
  loadingCommentsElement.classList.remove("-display-none");

  return get()
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Сервер сломался');
      } else if (response.status === 401) {
        throw new Error("Нет авторизации");
      } else {
        return response.json();
      }
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString(),
          text: comment.text,
          counterLike: comment.likes,
          draw: "",
          color: false,
        }
      });
      comments = appComments;
      buttonElement.disabled = false;
      loadingCommentsElement.classList.add("-display-none");
      renderComments(listElement, comments);
    })
    .catch((error) => {
      if (error.message === 'Сервер сломался') {
        alert('Сервер сломался, попробуй позже');
      } else {
        alert('Кажется, у вас сломался интернет, попробуйте позже...');
        console.warn(error);
      }
    })
}

function fetchPost() {
  return post(nameInputElement.value, textAreaInputElement.value)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Сервер сломался');
      } else if (response.status === 400) {
        throw new Error('Введены некорректные данные');
      } else if (response.status === 401) {
        throw new Error("Нет авторизации");
      } else {
        return fetchGet();
      }
    })
    .then(() => {
      nameInputElement.value = '';
      textAreaInputElement.value = '';
    })
    .catch((error) => {
      if (error.message === 'Сервер сломался') {
        alert('Сервер сломался, попробуй позже');
        console.warn(error);
      } else if (error.message === 'Введены некорректные данные') {
        alert('Имя и комментарий должны быть не короче 3 символов');
        console.warn(error);
      } else if (error.message === 'Нет авторизации') {
        alert('Авторизируйтесь прежде чем добавлять комментарии');
      } else {
        alert('Кажется, у вас сломался интернет, попробуйте позже...');
        console.warn(error);
      }
    })
}