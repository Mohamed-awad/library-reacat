export default function EditAuthor(data) {

  return fetch('http://localhost:8001/api/users/'+data.id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log(error);
  })
}
