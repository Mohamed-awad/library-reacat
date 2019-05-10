export default function getBook(data) {
  return fetch('http://localhost:4000/books/'+data)
      .then(response =>
      response.json())
}