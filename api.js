import { fetchGet } from "./index.js";

const host = "https://webdev-hw-api.vercel.app/api/v2/Svetlana/comments";

export function getComments({ token }) {
    return fetch(
        host,
        {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            } else if (response.status === 401) {
                throw new Error('Нет авторизации');
            } else {
                return response.json();
            }
        })
}

export function addComments({ token }, name, text) {
    return fetch(
        host,
        {
            method: "POST",
            headers: {
                Authorization: token,
            },
            body: JSON.stringify({
                name: name,
                text: text,
                //forceError: true,
            })
        })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            } else if (response.status === 400) {
                throw new Error('Введены некорректные данные');
            } else if (response.status === 401) {
                throw new Error('Нет авторизации');
            } else {
                return fetchGet();
            }
        })
}

export function loginUser({ login, password }) {
    return fetch(
        "https://webdev-hw-api.vercel.app/api/user/login",
        {
            method: "POST",
            body: JSON.stringify({
                login,
                password,
            })
        })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Неверный логин или пароль')
            };
            /*} else if (response.status === 400) {
                throw new Error('Введены некорректные данные');
            } else if (response.status === 401) {
                throw new Error('Нет авторизации');
            } else {
                return fetchGet();
            }*/
            return response.json();
        })
}

export function registerUser({ login, password, name }) {
    return fetch(
        "https://webdev-hw-api.vercel.app/api/user",
        {
            method: "POST",
            body: JSON.stringify({
                login,
                password,
                name,
            })
        })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Такой пользователь уже существует')
            };
            /*} else if (response.status === 400) {
                throw new Error('Введены некорректные данные');
            } else if (response.status === 401) {
                throw new Error('Нет авторизации');
            } else {
                return fetchGet();
            }*/
            return response.json();
        })
}