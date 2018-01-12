export default (url, method, body)=>(
  fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: (!['GET', 'DELETE'].includes(method) ? JSON.stringify(body) : undefined)
  })
)
