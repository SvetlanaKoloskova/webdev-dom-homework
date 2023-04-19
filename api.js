const host = "https://webdev-hw-api.vercel.app/api/v2/svetlana-koloskova/comments";
//https://webdev-hw-api.vercel.app/api/v1/Svetlana/comments

const token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

function get() {
    return fetch(
        host,
        {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
}

function post(postName, postText) {
    return fetch(
        host,
        {
            method: "POST",
            headers: {
                Authorization: token,
            },
            body: JSON.stringify({
                name: postName,
                text: postText,
                //forceError: true,
            })
        })
}

export { get, post };