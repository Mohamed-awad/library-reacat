import Cookies from 'universal-cookie';

export default function AddReview(data) {
  console.log(data);
  return fetch('http://localhost:4000/review/', {
    body: JSON.stringify(data),
    method: 'POST',
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