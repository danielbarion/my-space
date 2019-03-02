
const get = (params) => {
  const {
    pagination
  } = params
  const url = `https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=${pagination.page > 1 ? (pagination.page * 10) : 0}&apikey=7f01d88c02623145666b4af6c47029d6`

  fetch(url).then(response => {
    const { status } = response

    if (status !== 200) {
      console.warn('status of response !== 200')
      return
    }

    return response.json()
  }).then(response => {
    const { count, limit, offset, results, total } = response.data

    const parsedResponse = {
      count,
      limit,
      offset,
      results,
      total
    }

    return parsedResponse
  }).catch(error => {
    console.error(error)
  })

}


const api = () => {

}

export default api