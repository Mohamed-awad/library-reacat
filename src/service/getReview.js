export default function getReview(data) {
  return fetch('http://localhost:4000/review/'+data)
      .then(response =>
      response.json())
}