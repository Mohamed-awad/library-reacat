export default function getUser(data) {
  return fetch('http://localhost:4000/users/'+data)
      .then(response =>
      response.json())
}