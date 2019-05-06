
export default function GetSearch(data) {
  console.log(JSON.stringify(data));
  return fetch('http://localhost:4000/search/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}