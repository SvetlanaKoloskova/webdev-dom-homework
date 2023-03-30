const listElement = document.getElementById("list");
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textAreaInputElement = document.getElementById("text-area");

let currentData = { day: 'numeric', month: 'numeric', year: '2-digit' };
let currentTime = { hour: 'numeric', minute: 'numeric' };
let myDate = new Date();
let comments = [];

fetchGet();

const renderComments = () => {
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

  listElement.innerHTML = commentsHtml;

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
};

buttonElement.addEventListener('click', () => {
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

  fetch(
    'https://webdev-hw-api.vercel.app/api/v1/S/comments',
    {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value,
        text: textAreaInputElement.value,
      })
    })
    .then(() => {
      return fetchGet();
    })
    .then(() => {
      nameInputElement.value = '';
      textAreaInputElement.value = '';
    })
});

function fetchGet() {
  return fetch(
    'https://webdev-hw-api.vercel.app/api/v1/S/comments',
    {
      method: "GET"
    })
    .then((response) => {
      return response.json();
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
      renderComments();
    })
}