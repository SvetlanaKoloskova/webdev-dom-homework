import { loginUser, registerUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, renderComments }) {
    let isLoginMode = true;

    const renderForm = () => {
        const appHtml = `
        <div class="container">
        <div id="add-form" class="add-form">
          <b>Форма ${isLoginMode ? "входа" : "регистрации"}</b>
          ${isLoginMode ? "" : `<input type="text" class="add-form-text" placeholder="Введите имя" id="name-input" />`}
          <input type="text" class="add-form-text" placeholder="Введите логин" id="login-input" />
          <input type="password" class="add-form-text" placeholder="Введите пароль" id="password-input" /><br>
          <div class="add-form-row">
            <button class="add-form-button" id="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
            <button class="form-toggle-button" id="toggle-button">${isLoginMode ? "Зарегистрироваться" : "Войти"}</button>
          </div>
        </div>
      </div>`

        appEl.innerHTML = appHtml;



        document.getElementById("login-button").addEventListener('click', () => {

            if (isLoginMode) {
                const login = document.getElementById("login-input").value;
                const password = document.getElementById("password-input").value;
                localStorage.setItem('currentUser', login);

                if (!login) {
                    alert('Введите логин');
                    return;
                }

                if (!password) {
                    alert('Введите пароль');
                    return;
                }

                loginUser({
                    login: login,
                    password: password,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    renderComments();
                }).catch(error => {
                    alert(error.message);
                });
            } else {
                const name = document.getElementById("name-input").value;
                const login = document.getElementById("login-input").value;
                const password = document.getElementById("password-input").value;
                localStorage.setItem('currentUser', login);

                if (!name) {
                    alert('Введите имя');
                    return;
                }

                if (!login) {
                    alert('Введите логин');
                    return;
                }

                if (!password) {
                    alert('Введите пароль');
                    return;
                }

                registerUser({
                    login: login,
                    password: password,
                    name: name,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    renderComments();
                }).catch(error => {
                    alert(error.message);
                });
            }
        })

        document.getElementById("toggle-button").addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            renderForm();
        })
    }

    renderForm();
}