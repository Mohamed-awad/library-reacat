export default function getAuthors() {
  return fetch('http://localhost:8001/api/users/', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
      response.json())
}
