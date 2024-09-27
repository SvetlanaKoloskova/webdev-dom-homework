const listElement = document.getElementById("list");
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textAreaInputElement = document.getElementById("text-area");

let currentData = { day: 'numeric', month: 'numeric', year: '2-digit' };
let currentTime = { hour: 'numeric', minute: 'numeric' };
let myDate = new Date();

const comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    counterLike: 3,
    draw: "",
    color: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    counterLike: 75,
    draw: "-active-like",
    color: true,
  },
];

const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
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

renderComments();

buttonElement.addEventListener('click', () => {
  const oldList = listElement.innerHTML;

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

  comments.push({
    name: nameInputElement.value,
    date: `${myDate.toLocaleString("ru-RU", currentData)} ${myDate.toLocaleTimeString("ru-RU", currentTime)}`,
    text: textAreaInputElement.value,
    counterLike: 0,
    draw: "",
    color: false,
  })

  renderComments();

  nameInputElement.value = '';
  textAreaInputElement.value = '';
})

console.log("It works!");