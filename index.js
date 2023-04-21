import { addComments, getComments } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";

let currentData = { day: 'numeric', month: 'numeric', year: '2-digit' };
let currentTime = { hour: 'numeric', minute: 'numeric' };
let myDate = new Date();
let comments = [];

const host = "https://webdev-hw-api.vercel.app/api/v2/Svetlana/comments";
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

fetchGet();

renderComments();

function renderComments() {

  const appEl = document.getElementById("app");

  if (!token) {
    renderLoginComponent({
      appEl, setToken: (newToken) => {
        token = newToken;
      }, renderComments
    });
    return;
  }

  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div data-index="${index}" class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.counterLike}</span>
            <button data-index="${index}" class="like-button ${comment.draw}"></button>
          </div>
        </div>
      </li>`;
  }).join("");

  let login = localStorage.getItem('currentUser');
  const appHtml = `
          <div class="container">
          <ul class="comments" id="list">
            ${commentsHtml}
          </ul>
          <div id="loading-comments" class="loading -display-none">
            <p id="loading-text">Комментарии загружаются, пожалуйста, подождите...</p>
          </div>

          <div id="add-form" class="add-form">
            <input type="text" class="add-form-name-block" placeholder=${login} id="name-input" readonly /> 
            <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
              id="text-area"></textarea>
            <div class="add-form-row">
              <button class="add-form-button" id="add-button">Написать</button>
            </div>
          </div>
        </div>`

  appEl.innerHTML = appHtml;

  const listElement = document.getElementById("list");
  const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const textAreaInputElement = document.getElementById("text-area");
  const loadingCommentsElement = document.getElementById("loading-comments");
  const addFormElement = document.getElementById("add-form");

  const commentsElements = document.querySelectorAll(".comment-text");

  for (const commentElement of commentsElements) {
    commentElement.addEventListener('click', () => {
      const index = commentElement.dataset.index;
      const commentText = comments[index].text;
      const commentName = comments[index].name;
      textAreaInputElement.value = '> ' + commentText + '\n\n' + commentName;
    })
  }

  const likesElements = document.querySelectorAll(".like-button");

  for (const likeElement of likesElements) {
    likeElement.addEventListener('click', () => {
      const index = likeElement.dataset.index;
      if (comments[index].color === false) {
        comments[index].counterLike += 1;
        comments[index].draw = "-active-like";
        comments[index].color = true;
      } else {
        comments[index].counterLike -= 1;
        comments[index].draw = "";
        comments[index].color = false;
      }
      renderComments();
    });
  };

  buttonElement.addEventListener('click', () => {
    /*nameInputElement.classList.remove("error");
    if (nameInputElement.value === '') {
        nameInputElement.classList.add("error");
        return;
    }*/
    textAreaInputElement.classList.remove("error");
    if (textAreaInputElement.value === '') {
      textAreaInputElement.classList.add("error");
      return;
    }

    addComments({ token }, nameInputElement.value, textAreaInputElement.value)
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
          alert('Авторизируйтесь');
        } else {
          alert('Кажется, у вас сломался интернет, попробуйте позже...');
          console.warn(error);
        }
      })
  })
};

function fetchGet() {

  //buttonElement.disabled = true;
  //loadingCommentsElement.classList.remove("-display-none");

  return getComments({ token })
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
      //buttonElement.disabled = false;
      //loadingCommentsElement.classList.add("-display-none");
      renderComments();
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

export { fetchGet }