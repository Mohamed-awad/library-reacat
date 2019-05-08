export default function getAuthor(data) {
  return fetch('http://localhost:4000/authors/'+data)
      .then(response =>
      response.json())
}