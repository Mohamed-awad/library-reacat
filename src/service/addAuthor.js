import Cookies from "universal-cookie";

export default function AddBook(data) {
  console.log(data);
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('dateOfBirth', data.dateOfBirth);
  formData.append('photo', data.photo);

  return fetch('http://localhost:4000/authors/', {
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