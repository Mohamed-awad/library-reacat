export default function getBooks() {
  return fetch('http://localhost:8001/api/bookss/', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
      response.json())
}
