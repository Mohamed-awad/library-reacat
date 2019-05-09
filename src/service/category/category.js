export default function getCategories() {
  return fetch('http://localhost:8001/api/categories/', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('TOKEN'),
    },
  }).then(response =>
  {
    console.log(response);
    return response.json()
  })
}
