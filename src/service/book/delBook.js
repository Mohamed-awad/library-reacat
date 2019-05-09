export default function DeleteBook(id) {
  return fetch('http://localhost:8001/api/bookss/'+id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data not deleted');
  })
}
