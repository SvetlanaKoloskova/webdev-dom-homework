function get() {
    return fetch(
        'https://webdev-hw-api.vercel.app/api/v1/Svetlana/comments',
        {
            method: "GET"
        })
}

function post(postName, postText) {
    return fetch(
        'https://webdev-hw-api.vercel.app/api/v1/Svetlana/comments',
        {
            method: "POST",
            body: JSON.stringify({
                name: postName,
                text: postText,
                forceError: true,
            })
        })
}

export { get, post };