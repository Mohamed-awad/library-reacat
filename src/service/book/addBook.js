import Cookies from "universal-cookie";

export default function AddBook(data) {
  console.log(data);
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('categoryId', data.categoryId);
  formData.append('authorId', data.authorId);
  formData.append('photo', data.photo);

  return fetch('http://localhost:4000/books/', {
    // body: JSON.stringify(data),
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}