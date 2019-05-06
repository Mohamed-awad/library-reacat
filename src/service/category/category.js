export default function getCategories() {
  return fetch('http://localhost:8001/api/categories/')
      .then(response =>
      response.json())
}
