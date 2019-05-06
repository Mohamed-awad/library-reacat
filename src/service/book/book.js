export default function getBooks() {
  return fetch('http://localhost:8001/api/bookss/')
      .then(response =>
      response.json())
}
