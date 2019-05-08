import Cookies from "universal-cookie";

export default function DeleteBook(id) {
  return fetch('http://localhost:4000/books/'+id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data not deleted');
  })
}