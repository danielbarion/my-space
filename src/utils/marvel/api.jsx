const get = (params) => {
  const { pagination } = params

  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters`
  const offset = pagination.page > 1 ? (pagination.page * 10) : 0
  const apiKey = '7f01d88c02623145666b4af6c47029d6'
  const limit = 10
  const url = `${baseUrl}?limit=${limit}&offset=${offset}&apikey=${apiKey}`

  return fetch(url).then(response => {
    const { status } = response

    if (status !== 200) {
      console.warn('status of response !== 200')
      return
    }

    return response.json()
  }).catch(error => {
    console.error(error)
  })
}


/**
 * Marvel Api
 */
const api = () => {
  return {
    get
  }
}

export default api()