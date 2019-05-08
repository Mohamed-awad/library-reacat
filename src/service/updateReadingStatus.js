import Cookies from 'universal-cookie';

export default function UpdateReadStatus(data) {
  console.log(data);
  return fetch('http://localhost:4000/users/current/books/', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}