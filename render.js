const textAreaInputElement = document.getElementById("text-area");

function renderComments(listElement, comments) {
  listElement.innerHTML = comments.map((comment, index) => {
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
      renderComments(listElement, comments);
    });
  };
};

export { renderComments };