export default function AddUser(data) {
  console.log(data);
  return fetch('http://localhost:8001/api/users/', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}
