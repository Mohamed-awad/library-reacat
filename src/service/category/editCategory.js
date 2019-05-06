export default function EditCategory(data) {

  return fetch('http://localhost:8001/api/categories/'+data.id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}
