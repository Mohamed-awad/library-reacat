export default function getAuthors() {
  return fetch('http://localhost:4000/authors/')
      .then(response =>
      response.json())
}