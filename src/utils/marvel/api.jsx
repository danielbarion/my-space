const get = (params) => {
  const {
    pagination,
    searchBar
  } = params

  const defaultParams = {
    limit: 10,
    offset: pagination.page > 1 ? (pagination.page * 10) : 0,
    apikey: '7f01d88c02623145666b4af6c47029d6'
  }

  if (searchBar) {
    defaultParams.name = searchBar.searchValue
  }

  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters`
  const keys = Object.keys(defaultParams)

  const url = keys.reduce((acc, item, index) => {
    acc = `${acc}&${item}=${defaultParams[item]}`

    return acc
  }, `${baseUrl}?`)

  return fetch(url).then(response => {
    const { status } = response

    if (status !== 200) {
      console.warn('Can\'t get data from Marvel T-T')
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