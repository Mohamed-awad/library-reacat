export default function AddBook(data) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('category_id', data.category_id);
  formData.append('author', data.author);
  formData.append('image', data.image);
  formData.append('description', data.description);
  formData.append('leasePerDay', data.leasePerDay);
  formData.append('NumberOfBook', data.NumberOfBook);
  return fetch('http://localhost:8001/api/bookss/', {
    // body: JSON.stringify(data),
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}
