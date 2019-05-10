export default function getUser(data) {
    return fetch('http://localhost:4000/users/' + data)
        .then(response => {
            console.log("============================");
            console.log(response);
            console.log("============================");
            return response.json();
        })
}
