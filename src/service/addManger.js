export default function AddManger(data) {
    console.table(data);
    console.log(localStorage.getItem('TOKEN'));

    return fetch('http://localhost:8001/api/users/', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('TOKEN'),
        },
    }).then(response => {
        console.table(response);
        return response.json()
    }).catch(error => {

        console.log('data will be send later');
    })
};
