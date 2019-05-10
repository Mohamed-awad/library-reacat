export default function EditBook(data) {
  console.log(data);
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('category_id', data.category_id);
  formData.append('description', data.description);
  formData.append('author', data.author);
  formData.append('NumberOfBook', data.NumberOfBook);
  formData.append('leasePerDay', data.leasePerDay);


  return fetch('http://localhost:8001/api/bookss/' + data.id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("TOKEN"),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
    console.log('data will be send later');
  })
}
