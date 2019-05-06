import Cookies from "universal-cookie";

export default function EditBook(data) {
  console.log(data);
  const formData = new FormData();
  formData.append('name', data.name);
  if(data.categoryId._id) {
    data.categoryId = data.categoryId._id;
  }
  if(data.authorId._id) {
    data.authorId = data.authorId._id;
  }
  formData.append('categoryId', data.categoryId);
  formData.append('authorId', data.authorId);
  formData.append('photo', data.photo);

  return fetch('http://localhost:4000/books/'+data._id, {
    method: 'PUT',
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